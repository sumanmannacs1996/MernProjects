import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR} from './types';
import setAuthToken from '../utils/setAuthToken';
// Get current user profile

export const getCurrentProfile =()=>async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })

    }

}