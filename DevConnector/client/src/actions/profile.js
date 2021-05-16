import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED, CLEAR_PROFILE} from './types';
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

// Create or update Profile
export const createProfile=(formData,history,edit=false)=> async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post('/api/profile',formData,config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created','success'));

        if(!edit){
            history.push('/dashboard');
        }

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Add Experience
export const addExperience=(formData,history)=>async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put('/api/profile/experience',formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Added','success'));
        history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Add Education
export const addEducation=(formData,history)=>async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put('/api/profile/education',formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Added','success'));
        history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Delete Experience
export const deleteExperience =(id)=> async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Experience Removed','success'));
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Delete Education
export const deleteEducation =(id)=> async dispatch=>{
    const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Education Removed','success'));
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Delete Profile and Account
export const deleteAccount =()=> async dispatch=>{
    if(window.confirm('Are you sure? This can Not be undone!')){
        const token = localStorage.token;
    // calling setAuthToken to set the token in request header 
    setAuthToken(token);
    try{
        const res = await axios.delete(`/api/profile`);

        // Clear profile
        dispatch({type:CLEAR_PROFILE});
        //Account Delete
        dispatch({type:ACCOUNT_DELETED});

        dispatch(setAlert('Your account has been permanently deleted','success'));
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }

    }
}