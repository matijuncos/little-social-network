import React, { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Comment from './Comment';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import postActions from '../Redux/actions/postActions';
import userActions from '../Redux/actions/userActions';

const Post = ({post, loggedUser, likeAction, follow, addComment, deletePost}) => {
    const [visible, setVisible] = useState(false)
    const [newComment, setNewComment] = useState({comment: ''})

    const sendComment = () =>{
        if(loggedUser){
            if(newComment.comment === ''){
                alert("You can't send an empty comment")
            }else{
                addComment(newComment)
            }
        }else{
            alert('sign in please')
        }
        setNewComment({comment: {content:''}})
    }
    console.log(newComment)

    const handleChange = (e) =>{
        setNewComment({
            id: post._id,
            comment:{userName: loggedUser.firstName , content: e.target.value, userId: loggedUser._id}
        })
        
    }

    const handleLike = () =>{
        if(loggedUser){
            if(post.likes.includes(loggedUser._id)){
                likeAction(post._id, {_id: loggedUser._id, action:'dislike'})
            }else{
                likeAction(post._id, {_id: loggedUser._id, action:'like'})
            }
        }
    }
    const handleFollow = () =>{
        if(post.user._id === loggedUser._id){
            alert("you can't follow yourself")
        }else if(loggedUser.following.includes(post.user._id)){
            follow(loggedUser._id, {_id: post.user._id, action: 'unfollow'})
        }else{
            follow(loggedUser._id, {_id: post.user._id, action: 'follow'})
    }}

    const handleDelete = () =>{
        deletePost(post._id)
    }
    return (
        <div className="postContainer">

            <div className="name">
                {post.user.firstName} {post.user.lastName} says:
            </div>
            <div className="content">
                {post.content}
            </div>
            <div className="icons">
                <div className="likesDiv">
                    {loggedUser && post.likes.includes(loggedUser._id) ? <FavoriteIcon onClick={handleLike} className='red pointer'/> : <FavoriteBorderIcon  onClick={handleLike} className='red pointer'/> }
                    <p>{post.likes.length}</p>
                </div>
                <div className="likesDiv">
                    <CommentIcon onClick={()=>setVisible(!visible)} className='green pointer'/>
                    <p>{post.comments.length}</p>
                </div>
                <Moment date={post.createdAt} fromNow ago/>
                {loggedUser._id !== post.user._id ?(
                    <p className='follow' onClick={handleFollow}>{loggedUser && loggedUser.following.includes(post.user._id) ? 'Unfollow' : 'Follow'}</p>
                ): <p><DeleteIcon color='secondary' onClick={handleDelete}/></p>}
            </div>
            
                <div className={visible ? "commentBox visible" : "commentBox"}>
                    <div className="commentList">

                        {post.comments.length === 0 ? (
                            <h3>Be the first one to comment!</h3>
                        ) : post.comments.map(comment => <Comment comment={comment} key={comment._id} post={post}/>)}
                    </div>
                    <div className="inputDiv commentInput">
                        <input type="text" placeholder='Write your comment' className='input 'onChange={handleChange} value={newComment.comment.content}/>
                        <SendIcon onClick={sendComment} className='sendIcon'/>
                    </div>
                </div>
            
        </div>
    
    )
}
const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser
    }
}

const mapDispatchToProps ={
    likeAction: postActions.likePost,
    follow: userActions.follow,
    addComment: postActions.addComment,
    deletePost: postActions.deletePost 
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)
