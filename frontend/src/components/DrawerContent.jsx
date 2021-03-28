import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Users from './Users'
import userActions from '../Redux/actions/userActions';

const DrawerContent = ({loggedUser, allUsers, signOut}) => {

    return (
        <div className='drawerContainer'>
            <Avatar alt="Remy Sharp" src="https://electronicssoftware.net/wp-content/uploads/user.png" className='avatar'/>
            <p>Hola {loggedUser.firstName}!</p>
            <button className='sendBtn' onClick={()=>signOut()}>Cerrar sesión</button>
            <p>Puedes seguir a estos usuarios</p>
            {allUsers.map(user =>  <Users user={user}/>)}
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser,
        allUsers: state.users.allUsers,
    }
}

const mapDispatchToProps = {
    signOut: userActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
