const {Router} = require('express');
const ItemsController = require('../controllers/items.controller');

const router = Router();

router.get('/', ItemsController.getAll)

router.get('/:id', ItemsController.getById)

router.post('/', ItemsController.create)

router.put('/:id', ItemsController.update)

router.delete('/:id', ItemsController.delete)

module.exports = router; 