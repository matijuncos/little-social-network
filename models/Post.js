const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    createdAt: String,
    content: String,
    comments:[{userName: String, content: String, userId: String}],    
    likes: Array
})

const Post = mongoose.model('post', postSchema)

module.exports = Post