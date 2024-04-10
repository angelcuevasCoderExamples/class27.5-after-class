const {Router} = require('express');
const userModel = require('../dao/models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { getToken } = require('../utils');

const sessionRouter = Router();


sessionRouter.post('/register', 
    passport.authenticate('register',{
        failureRedirect:'/api/sessions/failedRegister',
        session:false 
    }),
    (req, res)=>{
        res.send({status:'success', message:'User registered successfuly'})
    })

sessionRouter.get('/failedRegister',(req, res)=>{
    res.status(400).send({status:'error', error:'There has been a problem with the register process'})
})

/** login */

sessionRouter.post('/login', 
    passport.authenticate('login',{
        failureRedirect:'/api/sessions/failedLogin',
        session:false
    }),
    (req, res)=>{
        const {_id, first_name, last_name, role, email,cart, age} = req.user; 
        const serializableUser = {
            id: _id, 
            first_name,
            last_name,
            role,  
            age,
            cart, 
            email
        }
        const token = jwt.sign(serializableUser,'JWT_SECRET',{expiresIn:'1h'})
        res.cookie('jwtCookie', token);

        res.send({status:'success', message:'User logged successfuly'})
    })

sessionRouter.get('/failedLogin',(req, res)=>{
    res.status(400).send({status:'error', error:'There has been a problem with the login process'})
})

sessionRouter.get('/logout',(req, res)=>{
    // req.session.destroy((err)=>{
    //     if(err) return res.status(500).send('there was an error destroying session')
    // })
    res.clearCookie('jwtCookie')
    res.redirect('/login')
})


sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email'], session:false}), async(req, res)=>{})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login', session:false}),async(req, res)=>{
    
    const {_id, first_name, last_name, role, email,cart, age} = req.user; 
        const serializableUser = {
            id: _id, 
            first_name,
            last_name,
            role, 
            age,
            cart, 
            email
        }
        const token = jwt.sign(serializableUser,'JWT_SECRET',{expiresIn:'1h'})
        res.cookie('jwtCookie', token);

    res.redirect('/items')
})

sessionRouter.get('/current', getToken, (req, res)=>{
    const user = req.tokenUser; 
    res.send({payload: user})
})

module.exports = {
    sessionRouter: sessionRouter
};