import { Avatar } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'

const Users = ({user, follow, loggedUser}) => {

    const followUser = () =>{
        if(loggedUser.following.includes(user._id)){
            follow(loggedUser._id, {_id: user._id, action: 'unfollow'})
        }else{
            follow(loggedUser._id, {_id: user._id, action: 'follow'})
        }
    }
    console.log(user)
    return (
        <div className='postContainer userContainer'>
            <Avatar alt="Remy Sharp" src="https://electronicssoftware.net/wp-content/uploads/user.png" className='avatar'/>

            <div className="name">
                {user.firstName} {user.lastName}
            </div>
            <div className="folowing">
                <p>Followers: {user.following.length}</p>
                <p>Following: {user.followers.length}</p>
            </div>
            <div className="followBtn">
               <p onClick={followUser}>{loggedUser.following.includes(user._id) ? 'Unfollow' : 'Follow'}</p> 
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser
    }
}
const mapDispatchToProps = {
    follow: userActions.follow,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
