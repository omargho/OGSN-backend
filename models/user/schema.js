var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    picture:{
        type:String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
});

module.exports = {
    Schema: Schema
};