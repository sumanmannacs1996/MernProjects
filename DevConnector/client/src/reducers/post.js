import {GET_POST,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POSTS,REMOVE_COMMENT,ADD_COMMENT} from '../actions/types';
const initalState = {
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state = initalState,action){
    const{type,payload} = action;
    switch(type){
        case GET_POSTS :
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case GET_POST :
            return{
                ...state,
                post:payload,
                loading:false
            }    
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(p=>p._id !== payload.postId),
                loading:false
            }
        case ADD_POST:
            return{
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }        
        case POST_ERROR :
            return {
            ...state,
            error:payload,
            loading:false
            }
        case UPDATE_LIKES :
            return {
            ...state,
            posts: state.posts.map(p=>(p._id === payload.postId) ? {...p,likes:payload.likes} : p),
            loading:false
            }
        case ADD_COMMENT :
            return{
                ...state,
                post:{...state.post,comments:payload},
                loading:false
            }
        case REMOVE_COMMENT :
            return{
                ...state,
                post:{...state.post,comments:state.post.comments.filter(p=>p._id !== payload.commentId)},
                loading:false
            }                
        default:
            return state;        
    }
}