const passport = require(`passport`);
const local = require('passport-local');
const {hashPassword, isValidPassword} = require('../utils')
const github = require('passport-github2');
const userModel = require('../dao/models/user');

const initializePassport = ()=>{
    
    passport.use('register', new local.Strategy({
        passReqToCallback: true, 
        usernameField: 'email',
        session:false
    }, async (req, email, password, done)=>{
        try {
            
            const {first_name, last_name } = req.body;
            if(!first_name || !last_name ) return done(null, false, {message:'incomplete parameters'})
            
            const existingUser = await userModel.findOne({email})
            if(existingUser) return done(null, false, {message:'user by that email already exist'})
            
            const newUserData = {
                first_name, 
                last_name,
                email,
                password: hashPassword(password) 
            }

            let result = await userModel.create(newUserData)
            return done(null, result)
            
        } catch (error) {
            done(error)
        }
    }))


    passport.use('login', new local.Strategy({
        usernameField: 'email',
        session:false
    }, async (email, password, done)=>{
        try {            


            const user = await userModel.findOne({email});
            if(!user)  return done(null, false, {message:'user does not exist'})

            if(!isValidPassword(user, password)) return done(null, false, {message:'Incorrect password'})

            return done(null, user)

        } catch (error) {
            done(error)
        }
    }))


    passport.use('github', new github.Strategy({
        clientID: 'Iv1.7e08a1d02ad04420',
        clientSecret: '119066b6f3527ea31b27ed9ea8e37a64ca8c3f2e',
        callBackUrl: 'http://localhost:8080/api/sesions/githubcallback',
        session: false
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            const user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.name, 
                    last_name: '', //no viene,
                    age: 18,
                    email: profile._json.email,
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }else{
                return done(null, user)
            }

            done(null, false)
            
        } catch (error) {
            done(error);
        };
    }))

}

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    const user = await userModel.findOne({_id:id});
    done(null, user)
})



module.exports = initializePassport;