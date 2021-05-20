import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPostById} from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({getPostById,post:{post,loading},match}) => {

    useEffect(()=>{
        getPostById(match.params.id);
    },[getPostById]);
    return (
        <Fragment>
            {
                loading || post ===null ? <Spinner/> :(
                    <Fragment>
                        <Link to='/posts'className='btn'>Back To Post</Link>
                        <PostItem showAction={false} post={post}/>
                        <CommentForm postId={post._id}/>
                        <div className='comments'>
                            {post.comments.map(p=>(
                                <CommentItem key={p._id} comment={p} postId={post._id}/>
                            ))}

                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

Post.propTypes = {
    getPostById:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getPostById})(Post);
