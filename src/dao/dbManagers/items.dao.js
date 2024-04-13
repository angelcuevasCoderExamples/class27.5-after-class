const itemModel = require("../models/item");

class ItemsDao {

    async getAll(opt,paginationOpt){
        if(opt && paginationOpt){
            return await itemModel.paginate(opt,paginationOpt);
        }
        
        return await itemModel.find().lean()
    }

    async getById(id){
        return await itemModel.findOne({_id:id}).lean()
    }

    async create(item){
        return await itemModel.create(item)
    }

    async update(id, item){ 
        return await itemModel.updateOne({_id:id}, item)
    } 

    async delete(id){
        return await itemModel.deleteOne({_id:id})
    }
}

module.exports = ItemsDao;