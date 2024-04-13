const CartService = require('../services/carts.service')
const ItemsService = require('../services/items.service')

const cartService = new CartService()
const itemsService = new ItemsService()

class ViewsController {
    static async getHome(req, res){
        try{
            const items = await itemsService.getAll()
            res.render('home',{items:items})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getRealTimeItems(req, res){
        try{
            const items = await itemsService.getAll()
            res.render('realTimeItems',{items})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getChat(req, res){
        try{    
            res.render('chat',{})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getItems(req, res){    

        try {
            const {docs,...rest} = await itemsService.getAll(req.query);
            res.render('items', {items: docs, style:'items.css', user: req.tokenUser, ...rest})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getItemsAlt(req, res){ 
        try {
            const {docs,...rest} = await itemsService.getAll(req.query);
            res.render('items_alternative', {items: docs, ...rest})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getItemById(req, res){  
        try {
            const item= await itemsService.getById(req.params.iid);
            res.render('item', {item: item, style:'items.css'})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getCartById(req, res){
        try {
            const cart  = await cartService.getById(req.params.cid)
            res.render('cart', {...cart, style:'items.css'})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static async getRegister(req, res){
        try {
            res.render('register',{})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
        
    }
    static async getLogin(req, res){
        try{
            res.render('login')
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static getProfile(req, res){
        try{
            res.render('profile',{user: {}})
        } catch (error) {
            res.status(error.status || 500).send({status:'error', error: error.message})
        }
    }

    static get404(req, res){
        res.send({status:'error', message:`404 Not found, there's nothing on ${req.path}`})
    }
    
}

module.exports = ViewsController;