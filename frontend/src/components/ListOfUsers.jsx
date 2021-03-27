import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import userActions from '../Redux/actions/userActions'
import Users from './Users'

const ListOfUsers = ({loggedUser, allUsers, getUsers, follow}) => {

    useEffect(() => {
        getUsers()
    }, [getUsers])
    
    return (
        <div className='postsContainer'>
            <h3>Choose users to follow and see their posts</h3>
            <div className="usersContainer">
                {allUsers.map(user => <Users user={user} key={user._id}/>)}        
            </div>
            <Link to='/posts' className='backLink'>Go back</Link>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        allUsers: state.users.allUsers,
        loggedUser: state.users.loggedUser

    }
}
const mapDispatchToProps ={
    getUsers: userActions.getUsers,
    follow: userActions.follow
}


export default connect(mapStateToProps, mapDispatchToProps)(ListOfUsers)
