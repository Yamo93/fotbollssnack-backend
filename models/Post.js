const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    favoriteclub: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    forumType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    }
});

module.exports = Post = mongoose.model("posts", PostSchema);