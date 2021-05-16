import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux'
import {deleteExperience} from '../../actions/profile';
const Experience = ({experience,deleteExperience}) => {
    const experiences= experience.map(p=>(
        <tr key={p._id}>
            <td>{p.company}</td>
            <td className='hide-sm'>{p.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{p.from}</Moment> - {
                    p.to === null ? (' Now') :(<Moment format='YYYY/MM/DD'>{p.to}</Moment>)
                }
            </td>
            <td className='hide-sm'>{p.location}</td>
            <td>
                <button className='btn btn-danger' onClick={()=>deleteExperience(p._id)}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>

            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null,{deleteExperience})(Experience)
