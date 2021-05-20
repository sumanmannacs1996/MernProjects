import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST,POST_ERROR,UPDATE_LIKES} from './types';
import setAuthToken from '../utils/setAuthToken';

//Get posts
export const getPosts =() =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Add like
export const addLike =(postId) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes:res.data}
        })
    }catch(err){
        const error = err.response.data.msg;
        if(error){
            dispatch(setAlert(error, 'danger'));
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Remove like
export const removeLike =(postId) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes:res.data}
        })
    }catch(err){
        const error = err.response.data.msg;
        if(error){
            dispatch(setAlert(error, 'danger'));
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}