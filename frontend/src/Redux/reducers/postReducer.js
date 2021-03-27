const initState ={
    allPosts: []
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case 'GET_POSTS':
            return{
                ...state,
                allPosts: action.payload
            }
        case 'NEW_POST':
            return{
                ...state,
                allPosts: [...state.allPosts, action.payload]
            }
        case 'LIKE':
            return{
                ...state,
                allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case 'COMMENT':
            return{
                ...state,
                allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case 'DELETE_POST':
            return{
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.payload)
            }
        case 'DEL_COMMENT':
            return{
                ...state,
                allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        default:
            return state
    }
}
export default userReducer