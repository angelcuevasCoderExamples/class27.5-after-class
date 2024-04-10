const UserModel = require("../models/user");

class Users {
    constructor(){
        console.log('new intance of db manager')
    }
    async getAll(){
        let users = await UserModel.find().populate('courses').lean()
        return users;
    }
    async saveUser(user){
        let result = await UserModel.create(user)
        return result; 
    }

    async getById(id){
        let result = await UserModel.findOne({_id:id}).populate('courses').lean()
        return result; 
    }

    async getBy(params){
        let result = await UserModel.findOne(params).populate('courses').lean()
        return result; 
    }

    async updateUser(id, user){
        let result = await UserModel.updateOne({_id: id}, user);
    }
}

module.exports = Users;