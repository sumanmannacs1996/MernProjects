const express = require('express');
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/',[auth,[
    check('text',"Text is requird").not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        });
        await post.save();
        res.json(post);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/posts
// @desc    Get all the posts
// @access  Private

router.get('/',auth, async (req,res)=>{
    try{
        const posts = await Post.find().sort({date:-1})   //sort by date most recent first
        res.json(posts);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({message:"Post not found"});
        }
        res.json(post);
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({message:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({message:"Post not found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(400).json({message:"You are not authorized to delete this post"});
        }
        await Post.findByIdAndDelete(req.params.post_id);
        res.json({message:"Post Deleted"});
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({message:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports= router;