import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import postActions from '../Redux/actions/postActions'
import userActions from '../Redux/actions/userActions'
import Post from './Post'

const EachUser = (props) => {
    const {getPosts, getUsers, allPosts, allUsers} = props
    const {id} = props.match.params 
    
    const [userPosts, setUserPosts ] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        getPosts()
        getUsers()
    },[getPosts, getUsers])

    useEffect(()=>{
        setUserPosts(allPosts.filter(post => id===post.user._id))
        const filteredUser = allUsers.filter(user => user._id === id)
        setUser(filteredUser[0])
    },[allPosts, id, allUsers])


    return (
        <div className='postsContainer'>
                        <Avatar alt="Remy Sharp" src="https://electronicssoftware.net/wp-content/uploads/user.png" className='avatar'/>
                        <h4>{user._id && user.firstName}</h4>
            <Link to='/posts'> 
                Go Back
            </Link>
            <div>
                {userPosts.map(post => <Post post={post}/>)}
            </div>
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser,
        allPosts: state.posts.allPosts,
        allUsers: state.users.allUsers,
    }
}
const mapDispatchToProps = {
    getPosts: postActions.getPosts,
    sendNewPost: postActions.newPost,
    getUsers: userActions.getUsers,

}
export default connect(mapStateToProps, mapDispatchToProps)(EachUser)
