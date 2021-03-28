import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import postActions from '../Redux/actions/postActions'
import Post from './Post'
import Avatar from '@material-ui/core/Avatar';
// import ListOfUsers from './ListOfUsers';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import userActions from '../Redux/actions/userActions';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import DrawerContent from './DrawerContent';

const Posts = ({loggedUser, getPosts, allPosts, sendNewPost, getUsers}) => {

    const [newPost, setNewPost] = useState({user:'', content: ''})
    const [followingPosts, setFollowingPost ] = useState([])
    const [open, setOpen] =useState(false)

    useEffect(()=>{
        getPosts()
        getUsers()
    },[getPosts, getUsers])

    
    useEffect(()=>{
      setFollowingPost(allPosts.filter(post => loggedUser._id===post.user._id || loggedUser.following.includes(post.user._id) ))
    },[allPosts, loggedUser])

    const handlechange = (e) =>{
            setNewPost({user: loggedUser._id, content: e.target.value})
    }
    const handleClick = () =>{
        if(loggedUser){
            sendNewPost(newPost)
            setNewPost({user: '', content:''})
        }else{
            alert('signin')
        }
    }
    const handleDrawerOpen = () => {
        setOpen(!open);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    return (
        <div className='postsContainer'>
            <MenuOpenIcon onClick={handleDrawerOpen} />
            <Drawer
                className='drawer'
                variant="persistent"
                anchor="left"
                open={open}>
                <DrawerContent/>
            <p onClick={handleDrawerClose}>Cerrar</p>
            </Drawer>
            <div className="postInput">
            <Avatar alt="Remy Sharp" src="https://electronicssoftware.net/wp-content/uploads/user.png" className='avatar'/>
                <input type="text" value={newPost.content} name="" id="" placeholder={loggedUser ? `Hey ${loggedUser.firstName}! What's going on?` : 'Please sign in to post'} onChange={handlechange}/>
                <button onClick={handleClick} className='sendCommentBtn'>Send</button>
            </div>

            {followingPosts.map(post =>{
                return(
                    <Post post={post} key={post._id}/>
                    )
                } )}
                    <Link to='/users' className='backLink'>Seguir usuarios</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(Posts)
