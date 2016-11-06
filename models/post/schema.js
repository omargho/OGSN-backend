var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    video: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = {
    Schema: Schema
};