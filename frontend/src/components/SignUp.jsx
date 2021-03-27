import React, {useState} from 'react'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';


const SignUp = ({signUp}) => {

    const [error, setError] =useState('')
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password:'',
        firstName: '',
        lastName: ''
    })

    const handlechange = e =>{
        console.log(user)
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () =>{
        if(user.firstName === '' || user.lastName === ''|| user.email ==='' || user.password ===''){
            setError('Please, fill all the fields')
            setOpen(true)
            setTimeout(()=>{
                setOpen(false)
            }, 3000)
        }else{
            signUp(user)
        }
    }

    return (
        <>
            <div className="form">
            <Snackbar open={open}>
                <Alert severity="error" open={false}>{error}</Alert>
            </Snackbar>
            <h2>Create your account.</h2>
            <div className="inputs">
                <div className="inputDiv">
                    <input type='text' name='firstName' placeholder='Name' className='input' onChange={handlechange}/>
                </div>
                <div className="inputDiv">
                    <input type='text' name='lastName' placeholder='Lastname' className='input' onChange={handlechange}/>
                </div>
                <div className="inputDiv">
                    <input type='email' name='email' placeholder='Email' className='input' onChange={handlechange}/>
                </div>
                <div className="inputDiv">
                    <input type='password' name='password' placeholder='Password' className='input' onChange={handlechange}/>
                </div>
            </div>
                <div className="inputDiv">
                    <button className="sendBtn" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps={
    signUp: userActions.signUp
}
export default connect(null, mapDispatchToProps)(SignUp)
