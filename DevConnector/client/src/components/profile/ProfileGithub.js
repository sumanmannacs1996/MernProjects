import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {getGitRepos} from '../../actions/profile';
const ProfileGithub = ({getGitRepos,username,repos}) => {

    useEffect(()=>{
        getGitRepos(username);
    },[getGitRepos]);
    console.log(repos);
    return (
        <div className='profile-gitgub'>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {
                repos === null ? <Spinner /> :
                (
                    repos.map(p=>(
                        <div key={p._id} className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>
                                    <a href={p.html_url} target='_blank' rel='noopener noreferrer'>{p.name}</a>
                                </h4>
                                <p>{p.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className='badge badge-primary'>
                                        Stars: {p.stargazers_count}
                                    </li>
                                    <li className='badge badge-dark'>
                                        Watchers: {p.watchers_count}
                                    </li>
                                    <li className='badge badge-loght'>
                                        Forks: {p.forks_count}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

ProfileGithub.propTypes = {
    getGitRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
    username:PropTypes.string.isRequired,
}
const mapStateToProps = state =>({
    repos:state.profile.repos
})

export default connect(mapStateToProps,{getGitRepos})(ProfileGithub);
