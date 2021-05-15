import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

const Dashboard = props => {

    useEffect(()=>{
        props.getCurrentProfile();
    },[])
    return (
        <div>
            Dashboard
        </div>
    )
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
