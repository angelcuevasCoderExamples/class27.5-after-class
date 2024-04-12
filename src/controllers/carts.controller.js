const CartService = require('../services/carts.service');

const cartService = new CartService();

class CartsController {

    static async create(req, res){  
        try {
            await cartService.create();
            res.send({status:'success'})
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }

    static async getById(req, res){
        try {
            const id = req.params.id; 
            const cart = await cartService.getById(id)
            res.send({status:'success', items: cart.items})
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }
    /** cart content specific methods */
    
    static async addItem(req, res){ 
        const id = req.params.id; 
        const itemId = req.params.iid; 
        
        try {
            const result = await cartService.addItem(id, itemId)
            res.send({status:'success', payload: result})
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }

    }

    static async deleteItem(req, res){
        const {id, iid} = req.params; 
        try {
            const result = await cartService.deleteItemById(id, iid)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }

    static async updateItemQuantity(req, res){
        const {id, iid} = req.params;
        const quantity = req.body.quantity
        
        try {
            const result = await cartService.updateItemQuantity(id, iid, quantity)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async updateItems(req, res){
        const {id} = req.params;
    
        try {
            const result = await cartService.updateCartItems(id, req.body)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async deleteAllItems(req, res){
        const {id} = req.params; 
        try {
            const result = await cartService.deleteAllItems(id)
            res.send(result)
        } catch (error) {
            return res.status(error.status || 500).send({status:'error', error:error.message})
        }
    }
}

module.exports = CartsController; 