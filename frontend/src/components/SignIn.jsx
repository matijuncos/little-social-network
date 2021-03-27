import React, { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';

const SignIn = ({loggedUser, signIn}) => {

    const [error, setError] =useState('')
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password:''
    })

    const handleClick = async () =>{
        if(user.email ==='' || user.password === ''){
            setError('Please, fill all the fields')
            setOpen(true)
            setTimeout(()=>{
                setOpen(false)
            },3000)
        }else{
            const res = await signIn(user)
            if(res && !res.success){
                setError(res.errors.errors)
                setOpen(true)
                setTimeout(()=>{
                    setOpen(false)
                },3000)
    
            }
        }
    }
    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
        <div className="form">
            <Snackbar open={open}>
                <Alert severity="error" open={false}>{error}</Alert>
            </Snackbar>
        <h2>Please, fill the data to signin</h2>
        <div className="inputs">
            <div className="inputDiv">
                <input type='email' name='email' placeholder='Email' className='input' onChange={handleChange}/>
            </div>
            <div className="inputDiv">
                <input type='password' name='password' placeholder='Password' className='input' onChange={handleChange}/>
            </div>
        </div>
            <div className="inputDiv">
                <button className="sendBtn" onClick={handleClick}>Enviar</button>
            </div>
        </div>
    </>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser
    }
}
const mapDispatchToProps={
    signIn: userActions.signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
