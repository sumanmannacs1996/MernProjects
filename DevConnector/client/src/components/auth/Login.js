import React, { Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import PropTypes from 'prop-types'

const Login = (props) => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });
    const {email,password} = formData;
    const onChange = e=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        //console.log("Success");
        //calling acction for login
        props.login({email,password});
    }

    return (
    <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e=>onChange(e)}
          required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e=>onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
    )
}
Login.propTypes={
  login:PropTypes.func.isRequired,
}
export default connect(null,{login})(Login);
