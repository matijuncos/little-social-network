const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwtoken = require('jsonwebtoken')

const userController = {
        signUp : async (req, res) =>{
            const {firstName, lastName, password, email} = req.body
            var errors = {}
            const userExists = await User.findOne({email})
            if(userExists){
                var errors ={error: "There's already an account with that email"}
                res.json({
                    success: false,
                    errors: errors
                })
            }
            const hash = bcryptjs.hashSync(password, 12)
            const newUser = await new User({
                firstName,
                lastName,
                password: hash,
                email
            }).save()
            var token = jwtoken.sign({...newUser}, process.env.SECRET_KEY, {})
            return res.json({
                success: true,
                response: {
                    token,
                    firstName: newUser.firstName,
                    email: newUser.email,
                    _id: newUser._id,
                    following:newUser.following,
                    followers: newUser.followers



                }
            })
        },
        signIn: async (req, res)=>{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (user){
                const match = bcryptjs.compareSync(password, user.password)
                if(!match){
                    return res.json({success: false, errors: {errors: 'Wrong credentials'} })
                }
                var token = jwtoken.sign({...user}, process.env.SECRET_KEY, {})
                return res.json({
                    success: true, 
                    response: {
                        token, 
                        firstName: user.firstName, 
                        email: user.email, 
                        _id: user._id, 
                        following:user.following,
                        followers: user.followers

                    }})
            }else{
                return res.json({success: false, errors: {errors: 'Wrong credentials'} })
            }
        },
        addFollowing : async (req, res) =>{
            const {id} = req.params //
            const {_id, action} = req.body
            try {
                if(action === 'follow'){
                    await User.findByIdAndUpdate( id, {
                        $addToSet: {following: _id}
                    },{new: true})
                    await User.findByIdAndUpdate(_id,{
                        $addToSet: {followers: id}
                    },{new: true})
                    .then (user =>{
                        res.json({
                            success: true,
                            response: user
                        })
                    })
                }
                if(action ==='unfollow'){
                    await User.findByIdAndUpdate( id, {
                        $pull: {following: _id}
                    },{new: true})
                    .then (user =>{
                        res.json({
                            success: true,
                            response: user
                        })
                    })
                }
            } catch (error) {
                return res.json({
                    success: false,
                    response: error
                })
            }
        },
        addFollowers: async (res, req) =>{
            const {id} = req.params
            const {_id} = req.body
            try {
                await User.findByIdAndUpdate( id, {
                    $addToSet: {following: _id}
                },{new: true})
                .then (user =>{
                    res.json({
                        success: true,
                        response: user
                    })
                })
            } catch (error) {
                return res.json({
                    success: false,
                    response: error
                })
            }
            
        },
        getUsers: async (req, res) =>{
            try {
                const users = await User.find()
                return res.json({
                    success: true,
                    response: users
                })
            } catch (error) {
                return res.json({
                    success: false,
                    response: error
                })
            }
        },
        preserveLog: async (req, res) =>{
            console.log(req.user)
            try{
                return res.json({
                    success: true,
                    response:{
                        token: req.body.token,
                        firstName: req.user.firstName, 
                        email: req.user.lastName, 
                        _id: req.user._id, 
                        following: req.user.following,
                        followers: req.user.followers
                    }
                })
            }catch(err){
                console.log(err)
            }
        }
        

}
module.exports = userController