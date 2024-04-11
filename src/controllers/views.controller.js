const ItemsManager = require('../dao/dbManagers/ItemsManager')
const manager = new ItemsManager()

class ViewsController {
    static async getHome(req, res){
        const items = await manager.getItems()
        res.render('home',{items:items})
    }

    static async getRealTimeItems(req, res){
        const items = await manager.getItems()
        res.render('realTimeItems',{items})
    }

    static async getChat(req, res){
        res.render('chat',{})
    }

    static async getItems(req, res){    

        try {
            const {docs,...rest} = await manager.getItems(req.query);
            
            res.render('items', {items: docs, user: req.tokenUser, ...rest})
    
        } catch (error) {
            res.send({status:'error', error: error.message})
        }
    }

    //TODO: bring the rest of the views router endpoints
}

module.exports = ViewsController;