const keys = require('../config/keys');
const mongoose = require('mongoose');
/* Lokal anslutning */
// mongoose.connect('mongodb://localhost/testcourses', { useNewUrlParser: true, useUnifiedTopology: true });

/* Molnanslutning */
// mongoose.connect(keys.atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log('Connected.');
    const courseSchema = mongoose.Schema({
        courseId: String,
        courseName: String,
        coursePeriod: Number
    });

    const Course = mongoose.model('Course', courseSchema);

    exports.getCourses = cb => {
        Course.find((err, courses) => {
            if (err) return err;

            cb(courses);
        });
    };

    exports.getCourse = (courseId, cb) => {
        Course.findOne({ _id: courseId }, (err, course) => {
            if (err) {
                cb(err);
            } else {
                cb(course);
            }
        });
    };

    exports.addCourse = courseData => {
        const newCourse = new Course(courseData);
        newCourse.save((err, newCourse) => {
            if (err) {
                return err;
            } else {
                return newCourse;
            }
        });
    };

    exports.updateCourse = courseData => {
        Course.updateOne({ _id: courseData._id }, {
            courseId: courseData.courseId,
            courseName: courseData.courseName,
            coursePeriod: courseData.coursePeriod
        }, (err, response) => {
            if (err) {
                return err;
            } else {
                return response;
            }
        });
    };

    exports.deleteCourse = courseId => {
        Course.deleteOne({
            _id: courseId
        }, (err, course) => {
            if (err) {
                return err;
            } else {
                return course;
            }
        });
    };
});