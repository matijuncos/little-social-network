import axios from 'axios'

const postActions={
    getPosts: () =>{
        return async (dispatch, getState) =>{
            try{
                const response = await axios.get('http://localhost:4000/api/posts')
                dispatch({
                    type: 'GET_POSTS',
                    payload: response.data.response
                })
            }catch(e){
                console.log(e)
            }
        }
    },
    newPost : (post) =>{
        return async (dispatch, getState) =>{
            try {
                  const response = await axios.post('http://localhost:4000/api/posts', post)
                  dispatch({
                      type: 'NEW_POST',
                      payload: response.data.response
                  })
            } catch (error) {
                console.log(error)
            }
        }
    },
    deletePost:(id) =>{
        return async (dispatch, getState) =>{
            try {
                await axios.delete('http://localhost:4000/api/post/'+ id)  
                  dispatch({
                      type: 'DELETE_POST',
                      payload: id
                  })
            } catch (error) {
                console.log(error)
            }
        }
    },
    likePost:(id, obj)=>{
        return async (dispatch, getState) =>{
            try {
                const response = await axios.post('http://localhost:4000/api/like/'+id, obj)
                dispatch({
                    type: 'LIKE',
                    payload: response.data.response
                })
                console.log(response)
            } catch (error) {
                
            }
        }
    },
    addComment:(obj)=>{
        return async (dispatch, getState) =>{
            try {
                const response = await axios.post('http://localhost:4000/api/comment', obj)
                dispatch({
                    type: 'COMMENT',
                    payload: response.data.response
                })    
            } catch (error) {
                
            }
        }
    },
    delComment:(obj) =>{
        return async (dispatch, getState) =>{
            try{
                const response = await axios.put('http://localhost:4000/api/comment', obj)
                dispatch({
                    type: 'DEL_COMMENT',
                    payload: response.data.response
                })
            }catch(err){

            }
        }
    }
    
}
export default postActions