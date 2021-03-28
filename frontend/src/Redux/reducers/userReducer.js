const initState ={
    loggedUser: null,
    allUsers:[]
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case 'USER_LOG':
            localStorage.setItem('token', action.payload.token)
        return{
            ...state,
            loggedUser: action.payload
        }
        case 'SIGN_OUT':
            localStorage.clear()
            return{
                ...state,
                loggedUser: null
            }
        case 'FOLLOW':
            return{
                ...state,
                loggedUser: action.payload
            }
        case 'GET_USERS':
            return{
                ...state,
                allUsers: action.payload
            }
        default:
            return state
    }
}
export default userReducer