import axios from 'axios';
import {REGISTER_SUCCESS,REGISTER_FAIL} from './types';
import {setAlert} from './alert';
// Register User

export const register =({name,email,password})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    //prepering post data to json
    const body = JSON.stringify({name,email,password});

    try{
        const res = await axios.post('api/users',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(p => dispatch(setAlert(p.msg, 'danger')));
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }
}