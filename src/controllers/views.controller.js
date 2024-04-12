const CartService = require('../services/carts.service')
const ItemsService = require('../services/items.service')

const cartService = new CartService()
const itemsService = new ItemsService()

class ViewsController {
    static async getHome(req, res){
        const items = await itemsService.getAll()
        res.render('home',{items:items})
    }

    static async getRealTimeItems(req, res){
        const items = await itemsService.getAll()
        res.render('realTimeItems',{items})
    }

    static async getChat(req, res){
        res.render('chat',{})
    }

    static async getItems(req, res){    

        try {
            const {docs,...rest} = await itemsService.getAll(req.query);
            res.render('items', {items: docs, user: req.tokenUser, ...rest})
        } catch (error) {
            res.send({status:'error', error: error.message})
        }
    }

    static async getItemsAlt(req, res){  //alternativa 
        try {
            const {docs,...rest} = await itemsService.getAll(req.query);
            res.render('items_alternative', {items: docs, ...rest})
        } catch (error) {
            res.send({status:'error', error: error.message})
        }
    }

    static async getItemById(req, res){  //alternativa 
        try {
            const item= await itemsService.getAll(req.params.iid);
            res.render('item', {item: item})
        } catch (error) {
            res.send({status:'error', error: error.message})
        }
    }

    static async getCartById(req, res){
        try {
            const cart  = await cartService.getById(req.params.cid)
            res.render('cart', cart)
        } catch (error) {
            res.send({status:'error', error: error.message})
        }
    }

    static async getRegister(req, res){
        res.render('register',{})
    }
    static async getLogin(req, res){
        res.render('login')
    }

    static getProfile(req, res){
        //TODO
        res.render('profile',{user: {}})
    }

    static get404(req, res){
        res.send({status:'error', message:`404 Not found, there's nothing on ${req.path}`})
    }
    
}

module.exports = ViewsController;