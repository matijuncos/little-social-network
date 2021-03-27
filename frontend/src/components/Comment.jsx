import React from 'react'
import { connect } from 'react-redux'
import postActions from '../Redux/actions/postActions'
import DeleteIcon from '@material-ui/icons/Delete';

const Comment = ({comment, delComment, post}) => {

    const handleClick = () =>{
        delComment({id:post._id, commentId: comment._id})
    }

    return (
        <div className='comment'>
            <div>
               <p className='commentUser'>{comment.userName}</p>
               <p className='commentContent'>{comment.content}</p>
            </div>
            <div className="commentButtons">
                <DeleteIcon onClick={handleClick}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    delComment: postActions.delComment
}

export default connect(null, mapDispatchToProps)(Comment)
