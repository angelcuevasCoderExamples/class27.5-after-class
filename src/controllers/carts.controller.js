const CartManager = require('../dao/dbManagers/CartManager');
const ItemsManager = require('../dao/dbManagers/ItemsManager');

const itemsManager = new ItemsManager(); //--->itemsService
const cartManager = new CartManager(); //--->cartsService

class CartsController {

    static async create(req, res){ //api 
        try {
            await cartManager.addCart();
            res.send({status:'success'})
        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    }

    static async getById(req, res){ //api
        try {
            const id = req.params.id; 
            const cart = await cartManager.getCart(id)
            res.send({status:'success', items: cart.items})
        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    }
    //**  */
    static async addItem(req, res){ // <---traer logica del manager
        const id = req.params.id; 
        const itemId = req.params.iid; 
        
        try {
            const cart = await cartManager.getCart(id) //<---- obtener cart del cartsService
            const item = await itemsManager.getItem(itemId)//<---- obtener cart del itemsService
            if(!cart){
                res.status(400).send('Cart does not exist')
            }
            if(!item){
                res.status(400).send('item does not exist')
            }
        
            //cartManager.addItem(id, itemId)
            //const cart = await this.getCart(id);

            const index = cart.items.findIndex(i=>i.item._id == itemId)
            
            if(index >= 0){
                cart.items[index].quantity+=1;  
            }else{
                cart.items.push({item: itemId, quantity:1})
            }

            await cartModel.updateOne({_id: id},cart) //<---- update usando cartService

        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    
        res.send({status:'success'})
    }

    static async deleteItem(req, res){// <---traer logica del manager
        const {id, iid} = req.params; 
        try {
            const result = await cartManager.deleteProductById(id, iid)
            res.send(result)
        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    }

    static async updateItemQuantity(req, res){// <---traer logica del manager
        const {id, iid} = req.params;
        const quantity = req.body.quantity
        
        try {
            const result = await cartManager.updateItemQuantity(id, iid, quantity)
            res.send(result)
        } catch (error) {
            return res.status(500).send({status:'error', error: error.message})
        }
    }

    static async updateItems(req, res){ //actualizar contenido
        const {id} = req.params;
    
        try {
            const result = await cartManager.updateCartItems(id, req.body)
            res.send(result)
        } catch (error) {
            return res.status(500).send({status:'error', error: error.message})
        }
    }

    static async deleteAllItems(req, res){
        const {id} = req.params; 
        try {
            const result = await cartManager.deleteAllItems(id)
            res.send(result)
        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    }
}

module.exports = CartsController; 