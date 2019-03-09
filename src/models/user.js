const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validator(value) {
            if (value.toLoweCase().includes('password')) {
                throw new error('passowrd failed')
            }
        }
    },
    age: {
        type: Number,
        default: 0
    }
})

module.exports = User