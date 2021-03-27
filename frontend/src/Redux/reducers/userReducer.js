const initState ={
    loggedUser: null,
    allUsers:[]
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case 'USER_LOG':
        return{
            ...state,
            loggedUser: action.payload
        }
        case 'SIGN_OUT':
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