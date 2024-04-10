const itemModel = require("../models/item");
class ItemsManager {

    async addItem(item){
       await itemModel.create(item); 
    }

    async getItems(queryParams = null){
        let result = []
        let opt = {}
        if(queryParams){
            let paginationOpt = {page: queryParams.page || 1, limit: queryParams.limit || 10, lean:true}
            if(queryParams.sort){
                paginationOpt.sort = {price: queryParams.sort == 'asc' ? 1 : -1} 
            }
            
            if(queryParams.query){  
                opt = this.getOptionsObject(queryParams.query)
            }
            result =await  itemModel.paginate(opt,paginationOpt)

            if(!paginationOpt.page || result.totalPages < paginationOpt.page || paginationOpt.page <1){
                throw new Error('Page does not exist')
            }

        }else{
            result = await itemModel.find().lean() 
        }


        
        let extraLinkParams = ""
        if(queryParams){
            Object.keys(queryParams).forEach(key=>{   
                if(key != 'page'){ 
                    extraLinkParams+=`&${key}=${queryParams[key]}` 
                }
            })
        }


        result.prevLink = result.hasPrevPage  ? `/items?page=${result.prevPage}${extraLinkParams}` : ''
        result.nextLink = result.hasNextPage ? `/items?page=${result.nextPage}${extraLinkParams}` : ''
        
        
        return result; 
    }

    getOptionsObject(query){
        try {
            const obj = JSON.parse(query)    
            return obj; 
        } catch (error) {
            const opt = {$or:[{description: new RegExp(query)}, {category: new RegExp(query)}]}
            return  opt;     
        }
    
    }

    async getItem(id){
        const items = await itemModel.find({_id: id}).lean()  //alternativamente findOne
        return items[0]; 
    }

    async updateItem(id, newItem){
       await itemModel.updateOne({_id: id}, newItem)
    }

    async deleteItem(id){
        await itemModel.deleteOne({_id: id})
    }
}

module.exports = ItemsManager; 