const {Router}= require('express');
const CartsController = require('../controllers/carts.controller');

const router = Router();

router.post('/', CartsController.create)

router.get('/:id', CartsController.getById)

router.post('/:id/item/:iid', CartsController.addItem)

/** nuevos */
router.delete('/:id/item/:iid', CartsController.deleteItem)

router.put('/:id/item/:iid', CartsController.updateItemQuantity)

router.put('/:id', CartsController.updateItems)

router.delete('/:id', CartsController.deleteAllItems)


module.exports = router; 