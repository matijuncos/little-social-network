const Post = require('../models/Post')

const postController ={
    createPost: async (req, res) =>{
        const {user, content, comments, likes} = req.body
        try{
            const newPost = new Post ({
                user, content, comments, likes, createdAt: new Date().toISOString()
            }).save()
            .then( async newPost => {
                const populatedPost = await newPost.populate('user').execPopulate()
                return res.json({
                    success: true,
                    response: populatedPost
                })
            })

        }catch(err){
            console.log(err)
        }
    },
    getPosts : async (req, res) =>{
        try {
            const posts = await Post.find().populate('user')
            return res.json({
                success: true,
                response: posts
            })
        } catch (error) {
            console.log(error)
        }
    },
    deletePost: async (req, res)=>{
        const {_id} = req.params
        try {
           await Post.findByIdAndDelete(_id).populate('user')
           .then(removed =>{
               return res.json({success: true, response: removed})
           })
        } catch (error) {
            console.log(error)
        }
    },
    addLike: async (req, res) =>{
        const {id} = req.params
        const {_id, action} = req.body
        try {
            if(action === "like"){
                await Post.findByIdAndUpdate(id, {
                    $addToSet: {likes: _id}
                }, {new: true}).populate('user')
                .then (likedPost =>{
                    return res.json({
                        success: true,
                        response: likedPost
                    })
    
                }).catch(err =>{
                    return res.json({
                        success: false,
                        response: err
                    })
                })
            }
            if(action === "dislike"){
                await Post.findByIdAndUpdate(id, {
                    $pull: {likes: _id}
                }, {new: true}).populate('user')
                .then (likedPost =>{
                    return res.json({
                        success: true,
                        response: likedPost
                    })
    
                }).catch(err =>{
                    return res.json({
                        success: false,
                        response: err
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    addComment: async (req, res) =>{
        const {id, comment} = req.body
           await Post.findByIdAndUpdate(id, {
                $push: {comments: comment}
            },{new: true}).populate('user')
            .then(commentedPost =>{
                return res.json({
                    success: true,
                    response: commentedPost
                })
            })
            .catch(error =>{
                return res.json({
                    success: false,
                    response: error
                })
            })
    },
    delComment : async(req, res) =>{
        const {id, commentId} = req.body //postId y commentId
        await Post.findByIdAndUpdate(id, {
            $pull: {comments:{_id: commentId}}
        },{new: true}).populate('user')
        .then(postWithoutComment =>{
            return res.json({
                success: true,
                response: postWithoutComment
            })
        })
        .catch(error =>{
            return res.json({
                success: false,
                response: error
            })
        })
    }

}

module.exports = postController