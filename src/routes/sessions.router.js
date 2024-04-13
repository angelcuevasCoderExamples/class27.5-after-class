const {Router} = require('express');
const passport = require('passport')
const { getToken } = require('../utils');
const SessionController = require('../controllers/session.controller');
const sessionRouter = Router();

sessionRouter.post('/register', 
    passport.authenticate('register',{
        failureRedirect:'/api/sessions/failedRegister',
        session:false 
    }),
    SessionController.registerUser)

sessionRouter.get('/failedRegister', SessionController.getRegisterError)

/** login */

sessionRouter.post('/login', 
    passport.authenticate('login',{
        failureRedirect:'/api/sessions/failedLogin',
        session:false
    }),
    SessionController.login)

sessionRouter.get('/failedLogin', SessionController.getLoginError)

sessionRouter.get('/logout', SessionController.logout)

sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email'], session:false}), async(req, res)=>{})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login', session:false}), SessionController.processGithub)

sessionRouter.get('/current', getToken, SessionController.getCurrent)

module.exports = {
    sessionRouter: sessionRouter
};