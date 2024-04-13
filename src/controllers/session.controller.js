const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

class SessionController {
    static async registerUser(req, res) {
        res.send({ status: 'success', message: 'User registered successfuly' })
    }
    static async getRegisterError(req, res) {
        res.status(400).send({ status: 'error', error: 'There has been a problem with the register process' })
    }
    static async login(req, res) {
        try {
            const { _id, first_name, last_name, role, email, cart, age } = req.user;
            const serializableUser = {
                id: _id,
                first_name,
                last_name,
                role,
                age,
                cart,
                email
            }
            const token = jwt.sign(serializableUser, jwtSecret, { expiresIn: '1h' })
            res.cookie('jwtCookie', token);
            res.send({ status: 'success', message: 'User logged successfuly' })
        } catch (error) {
            res.status(error.status || 500).send({ status: 'error', message: error.message })
        }
    }
    static async getLoginError(req, res){
        res.status(400).send({status:'error', error:'There has been a problem with the login process'})
    }
    static async logout(req, res){
        // req.session.destroy((err)=>{
        //     if(err) return res.status(500).send('there was an error destroying session')
        // })
        res.clearCookie('jwtCookie')
        res.redirect('/login')
    }
    static async processGithub(req,res){
        try {
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
        } catch (error) {
            res.status(error.status || 500).send({ status: 'error', message: error.message })
        }
    }
    static async getCurrent(req, res){
        const user = req.tokenUser; 
        res.send({payload: user})
    }  

}

module.exports = SessionController;