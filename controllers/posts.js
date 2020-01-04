// Load Post model
const Post = require("../models/Post");

// Load User model
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

const keys = require("../config/keys");

exports.getPosts = (req, res) => {
    Post.find({}).sort({ date: -1 }).exec((err, posts) => {
        if (err) return err;

        res.status(200).send(posts);
    });
};

exports.getPostsByLeague = (req, res) => {
    Post.find({ forumType: req.params.forumType }).sort({ date: -1 }).exec((err, posts) => {
        if (err) return err;

        res.status(200).send(posts);
    });
}

exports.getPost = (req, res) => {
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(post);
        }
    });
};

exports.addPost = (req, res) => {
    // Get userId from token
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    let userName, nickname, favoriteclub;
    User.findById({ _id: userId }, (err, user) => {
        if (err) return err;

        userName = user.name;
        nickname = user.nickname ? user.nickname : null;
        favoriteclub = user.favoriteclub ? user.favoriteclub : null;
    }).then(() => {
        const newPost = new Post({
            userId,
            userName,
            nickname,
            favoriteclub,
            text: req.body.text,
            forumType: req.body.forumType
        });
        newPost.save((err, newPost) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(newPost);
            }
        });
    })
        .catch(err => err);
};

exports.updatePost = (req, res) => {
    // Get userId from token
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    let userName;
    User.findById({ _id: userId }, (err, user) => {
        if (err) return err;

        userName = user.name;
    }).then(() => {
        Post.updateOne({ _id: req.params.id }, {
            userId,
            userName,
            text: req.body.text,
            forumType: req.body.forumType,
            updatedDate: new Date()
        }, (err, response) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send(response);
            }
        });
    });

};

exports.deletePost = (req, res) => {
    Post.deleteOne({
        _id: req.params.id
    }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.send(post);
        }
    });
};

exports.authorize = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });

    next();
}