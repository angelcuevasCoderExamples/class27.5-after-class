const {Router} = require('express');
const ItemsManager = require('../dao/dbManagers/ItemsManager');

const router = Router();

const manager = new ItemsManager()


router.get('/', async (req, res)=>{
    let query = req.query; 

    try {
        let {docs,...rest} = await manager.getItems(query)    
        res.send({status:'success', payload: docs, ...rest})
    } catch (error) {
        res.status(500).send({status:'error', error: error.message })
    }

    
})

router.get('/:id', async (req, res)=>{

    try {
        let item = await manager.getItem(req.params.id)
    } catch (error) {
        res.status(500).send({status:'error', error: error.message })
    }

    res.send({item: item})
})



router.post('/', async (req, res)=>{
    await manager.addItem(req.body)
    const items = await manager.getItems();
    req.io.emit('list updated',{items:items})
    res.redirect('/realtimeitems')
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const result = await manager.updateItem(id, req.body);
        
        res.send({status:'success', details: result})
    } catch (error) {
        res.status(500).send({status:'error', error: error.message })
    }

})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id; 
    try {
        const result = await manager.deleteItem(id);
        res.send({status:'success', details: result})        
    }catch (error) {
        res.status(500).send({status:'error', error: error.message })
    }

})



module.exports = router; 