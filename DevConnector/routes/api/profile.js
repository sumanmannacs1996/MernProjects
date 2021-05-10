const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route   GET api/profile/me
// @desc    Get the current user profile
// @access  Private
router.get('/me', auth, async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            res.status(400).json({mesage:'There is no profile for the user'});
        }
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports= router;