const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const {SECRET} = require('../config');

const userRegister = async(userDets, role, res)=>{ 
    try{
        let usernameNotTaken = await validateUsername(userDets.username);
        if(userDets.username === null){
            return res.status(404).json({
                message : 'can not register'
            })
        }
        if(usernameNotTaken){
            return res.status(400).json({
                message: 'Username is taken',
                success: false
            })
        } 
        let emailNotRegister = await validateUsername(userDets.email);
        if(userDets.email === null){
            return res.status(404).json({
                message : 'can not register'
            })
        }
        if(emailNotRegister){
            return res.status(400).json({
                message: 'email is taken',
                success: false
            })
        } 
        const password = await bcrypt.hash(userDets.password, 12)
    
        const newUser = new User ({
            ...userDets,
            password
        })
        await newUser.save();
        return res.status(201).json({
            message: 'Successfully registered',
            success: true
        })
    }catch(err){
        return res.status(500).json({
            message: 'Unable to create your account',
            success: false
        })
    }
}

const userLogin = async (userCreds, role, res) =>{
    let { username, password} = userCreds;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: 'Username not found. Invalid login credentials.',
            success: false
        });
    }
    if(user.role !== role){
    return res.status(403).json({
        message: 'Please make sure you logging in from the right portal.',
        success: false
        });

    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        },SECRET);
        
        let result = {
            username: user.username,
            email: user.email,
            role: user.role,
            token:`Bearer ${token}`
        };

        return res.status(200).json({
            ...result,
            message: 'You are now logged in.',
            success: true
        });
    }else{
        return res.status(403).json({
            message: 'Incorrect password.',
            success: false
            });
    }
}

const validateUsername = async username =>{
}
const userAuth = passport.authenticate('jwt',{session: false});

const checkRole = roles =>(req, res, next) => 
    !roles.includes(req.body.role)
    ? res.status(401).json('Unauthorized')
    : next ();

const serializeUser = user =>{
    return {
        username: user.username,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

module.exports={
    userRegister,
    userLogin,
    serializeUser,
    userAuth,
    checkRole
};