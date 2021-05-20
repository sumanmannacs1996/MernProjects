import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POSTS,ADD_COMMENT,REMOVE_COMMENT} from './types';
import setAuthToken from '../utils/setAuthToken';

//Get posts
export const getPosts =() =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

//Get post By id
export const getPostById =(postId) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.get(`/api/posts/${postId}`);
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

// Delete Post
export const deletePost =(postId) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type:DELETE_POST,
            payload:{postId}
        });
        dispatch(setAlert('Post removed successfully!!','success'));
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

// Add Post
export const addPost =(formData) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);

    const config ={
        headers:{
            'Content-type':'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts`,formData,config);
        dispatch({
            type:ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post created successfully!!','success'));
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

// Add Comment
export const addComment =(postId,formData) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);

    const config ={
        headers:{
            'Content-type':'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type:ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment added successfully!!','success'));
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

// Delete Comment
export const deleteComment =(postId,commentId) =>async dispatch=>{
    // calling setAuthToken to set the token in request header 
    const token = localStorage.token;
    setAuthToken(token);
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:{postId}
        });
        dispatch(setAlert('Comment removed successfully!!','success'));
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