import axios from 'axios';
import {setAlert} from './alert';
import {GET_POST,POST_ERROR} from './types';
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