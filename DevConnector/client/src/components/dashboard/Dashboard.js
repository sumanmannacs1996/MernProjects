import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction';
const Dashboard = props => {

    useEffect(()=>{
        props.getCurrentProfile();
    },[]);

    let user = props.auth.user

    return props.profile.loading &&  props.profile.profile===null ? <Spinner/> : 
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'>Welcome {user && user.name}</i>
        </p>
        {props.profile.profile !== null ?(
        <Fragment>
            <DashboardAction/>
        </Fragment>) :
        (<Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary m-1'>
                Create Profile
            </Link>
        </Fragment>)
        }
    </Fragment>
}
Dashboard.propTypes = {
    auth:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
}
const mapStateToProps =state=>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
