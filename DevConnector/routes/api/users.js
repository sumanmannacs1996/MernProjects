const express = require('express');
const {check,validationResult} = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcript  = require('bcryptjs');
// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password of minimum 6 charcter long').isLength({min:6})
] ,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;

    try{
        // Check if user already exists
        let user = await User.findOne({email});
        if(user){
           return res.status(400).json({errors:[{message:"User already exists"}]});
        }
        // Add user Gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encript password
        const salt = await bcript.genSalt(8);
        user.password =await bcript.hash(password,salt);

        //saving the user in DB

        await user.save();

        // Return jsowebtoken
        res.send('User Registerd!');

    }catch(err){
        console.log(err.message);
        res.send(500).send('Server Error')
    }
    res.send('User route');
});

module.exports= router;