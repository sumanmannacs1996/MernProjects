import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({education}) => {
    const educations= education.map(p=>(
        <tr key={p._id}>
            <td>{p.school}</td>
            <td className='hide-sm'>{p.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{p.from}</Moment> - {
                    p.to === null ? (' Now') :(<Moment format='YYYY/MM/DD'>{p.to}</Moment>)
                }
            </td>
            <td className='hide-sm'>{p.fieldofstudy}</td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>school</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'>Field of Study</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>

            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
}

export default Education
