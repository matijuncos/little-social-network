const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
})

const User = mongoose.model('user', userSchema)

module.exports = User