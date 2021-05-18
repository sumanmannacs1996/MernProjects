import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';
import {deleteAccount} from '../../actions/profile';
const Dashboard = ({getCurrentProfile,deleteAccount,auth,profile}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);

    let user = auth.user

    return profile.loading &&  profile.profile===null ? <Spinner/> : 
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'>Welcome {user && user.name}</i>
        </p>
        {profile.profile !== null ?(
        <Fragment>
            <DashboardAction/>
            <Experience experience={profile.profile.experience}/>
            <Education education={profile.profile.education} />
            <div className='my-2'>
                <button className='btn btn-danger' onClick={()=>deleteAccount()}>
                    <i className='fas fa-user-minus'>Delete My Account</i>
                    </button>
            </div>
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
    deleteAccount:PropTypes.func.isRequired,
}
const mapStateToProps =state=>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
