import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner';
import {getAllProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';
const Profiles = ({getAllProfiles,profile:{profiles,loading}}) => {

    useEffect(()=>{
        getAllProfiles();
    },[getAllProfiles]);
    return (
        <Fragment>
            {loading ? <Spinner /> :
            <Fragment>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'></i> Browse and connect with developers
                </p>
                <div className='profiles'>
                    {profiles.length > 0 ? (
                        profiles.map(p=>(
                            <ProfileItem key={p._id} profile={p} />
                        ))
                    ) : <h4>No profiles found..</h4>}
                </div>
                
            </Fragment>
            }
            
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles:PropTypes.func.isRequired
}

const mapStateToProps = state=>({
    profile: state.profile
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles);
