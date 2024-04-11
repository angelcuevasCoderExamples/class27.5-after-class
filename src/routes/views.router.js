const {Router} = require('express');
const CartManager = require('../dao/dbManagers/CartManager');
const ItemsManager = require('../dao/dbManagers/ItemsManager');
const jwt = require('jsonwebtoken');
const { getToken } = require('../utils');
const ViewsController = require('../controllers/views.controller');

const manager = new ItemsManager()
const cartManager = new CartManager()

const router = Router();

router.get('/', ViewsController.getHome)

router.get('/realtimeitems', ViewsController.getRealTimeItems)

router.get('/chat', ViewsController.getChat)

/** views */

router.get('/items', getToken, ViewsController.getItems)

/** alternative */
router.get('/items.alt', async (req, res)=>{  //alternativa 

    try {
        const {docs,...rest} = await manager.getItems(req.query);
        res.render('items_alternative', {items: docs, ...rest})
    } catch (error) {
        res.send({status:'error', error: error.message})
    }
})

router.get('/items/:iid', async (req, res)=>{  //alternativa 

    try {
        const item= await manager.getItem(req.params.iid);
        res.render('item', {item: item})
    } catch (error) {
        res.send({status:'error', error: error.message})
    }
})
/** ----------------- */


router.get('/carts/:cid', async (req, res)=>{

    try {
        const cart  = await cartManager.getCart(req.params.cid)
        res.render('cart', cart)
    } catch (error) {
        res.send({status:'error', error: error.message})
    }
})


/** DESAFIO 19 */


    /** middlewares */
    const publicAccess = (req, res, next)=>{
        //if(req.session && req.session.user) return res.redirect('/')
        next();
    }

    const privateAccess = (req, res, next)=>{
        // if(!req.session.user) {
        //     console.log("not logged in")
        //     return res.redirect('/login')
        // }
        next();
    }

router.get('/register', publicAccess, (req, res)=>{
    res.render('register',{})
})

router.get('/login', publicAccess, (req,res)=>{
    res.render('login')
})

router.get('/', privateAccess, (req,res)=>{
    //TODO
    res.render('profile',{user: {}})
})


module.exports = router; 