import axios from 'axios'

const userActions ={
    signIn:(user) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('http://localhost:4000/api/user/signin', user)

            if(!response.data.success){
                return response.data
            }
            dispatch({
                type: 'USER_LOG',
                payload: response.data.response
            })
        }
    },
    signUp:(user) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('http://localhost:4000/api/user/signup', user)
            if(response.data.success){
                dispatch({
                    type: 'USER_LOG',
                    payload: response.data.response
                })
                return response.data
            }
        }
    },
    signOut:()=>{
        return async (dispatch, getState)=>{
            dispatch({
                type:'SIGN_OUT'
            })
        }
    },
    preserve: (token) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('http://localhost:4000/api/user/storage', {token},{
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            dispatch({
                type:'USER_LOG',
                payload: response.data.response
            })
        }
    },
    follow:(id, obj)=>{
        return async (dispatch, getState) =>{
            try {
                const response = await axios.post('http://localhost:4000/api/following/'+id, obj)
                dispatch({
                    type: 'FOLLOW',
                    payload: response.data.response
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
    getUsers:()=>{
        return async (dispatch, getState)=>{
            try {
                const response = await axios.get('http://localhost:4000/api/users')
                dispatch({
                    type:'GET_USERS',
                    payload: response.data.response
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
export default userActions