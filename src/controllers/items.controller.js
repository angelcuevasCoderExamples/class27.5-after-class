const ItemsService = require('../services/items.service');

const itemsService = new ItemsService();

class ItemsController {
    static async getAll(req, res){
        let query = req.query; 
    
        try {
            let {docs,...rest} = await itemsService.getAll(query)    
            res.send({status:'success', payload: docs, ...rest})
        } catch (error) {
            res.status(500).send({status:'error', error: error.message })
        }
    
    }

    static async getById(req, res){

        try {
            let item = await itemsService.getById(req.params.id)
            res.send({item: item})
        } catch (error) {
            res.status(500).send({status:'error', error: error.message })
        }
    
        
    }

    static async create(req, res){
        await itemsService.create(req.body)
        const items = await itemsService.getAll();
        req.io.emit('list updated',{items:items})
        res.send({status:'success', details: items})
    }

    static async update(req, res){
        const id = req.params.id
    
        try {
            const result = await itemsService.update(id, req.body);
            
            res.send({status:'success', details: result})
        } catch (error) {
            console.log("error", error)
            res.status(error.status || 500).send({status:'error', error: error.message })
        }
    
    }

    static async delete(req, res){
        const id = req.params.id; 
        try {
            const result = await itemsService.delete(id);
            res.send({status:'success', details: result})        
        }catch (error) {
            res.status(500).send({status:'error', error: error.message })
        }
    
    }
}

module.exports = ItemsController; 