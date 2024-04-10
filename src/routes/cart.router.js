const {Router}= require('express');
const CartManager = require('../dao/dbManagers/CartManager');
const ItemsManager = require('../dao/dbManagers/ItemsManager');

const router = Router();


const itemsManager = new ItemsManager();
const cartManager = new CartManager();


router.post('/',async (req, res)=>{
    try {
        await cartManager.addCart();
        res.send({status:'success'})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const id = req.params.id; 
        const cart = await cartManager.getCart(id)
        res.send({status:'success', items: cart.items})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
})

router.post('/:id/item/:iid', async (req, res)=>{
    const id = req.params.id; 
    const itemId = req.params.iid; 

    try {
        const cart = await cartManager.getCart(id)
        const item = await itemsManager.getItem(itemId)
        if(!cart){
            res.status(400).send('Cart does not exist')
        }
        if(!item){
            res.status(400).send('item does not exist')
        }
    
        cartManager.addItem(id, itemId)
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }

    res.send({status:'success'})
})

/** nuevos */
router.delete('/:id/item/:iid', async (req, res)=>{
    const {id, iid} = req.params; 
    try {
        const result = await cartManager.deleteProductById(id, iid)
        res.send(result)
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
})



router.put('/:id/item/:iid', async (req, res)=>{
    const {id, iid} = req.params;
    const quantity = req.body.quantity
    
    try {
        const result = await cartManager.updateItemQuantity(id, iid, quantity)
        res.send(result)
    } catch (error) {
        return res.status(500).send({status:'error', error: error.message})
    }
})

router.put('/:id/', async (req, res)=>{ //actualizar contenido
    const {id} = req.params;

    try {
        const result = await cartManager.updateCartItems(id, req.body)
        res.send(result)
    } catch (error) {
        return res.status(500).send({status:'error', error: error.message})
    }
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params; 
    try {
        const result = await cartManager.deleteAllItems(id)
        res.send(result)
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
})


module.exports = router; 