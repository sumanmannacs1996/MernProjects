import {GET_POST,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST} from '../actions/types';
const initalState = {
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state = initalState,action){
    const{type,payload} = action;
    switch(type){
        case GET_POST :
            return {
                ...state,
                posts:payload,
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
        default:
            return state;        
    }
}