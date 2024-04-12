const {Router} = require('express');
const CartManager = require('../dao/dbManagers/CartManager');
const ItemsManager = require('../dao/dbManagers/ItemsManager');
const jwt = require('jsonwebtoken');
const { getToken } = require('../utils');
const ViewsController = require('../controllers/views.controller');
const publicAccess = require('../middlewares/publicAccess.middleware');
const privateAccess = require('../middlewares/privateAccess.middleware');

const manager = new ItemsManager()
const cartManager = new CartManager()

const router = Router();

router.get('/', ViewsController.getHome)

router.get('/realtimeitems', ViewsController.getRealTimeItems)

router.get('/chat', ViewsController.getChat)

router.get('/items', getToken, ViewsController.getItems)

router.get('/items.alt', ViewsController.getItemsAlt)

router.get('/items/:iid', ViewsController.getItemById)

router.get('/carts/:cid', ViewsController.getCartById)

router.get('/register', publicAccess, ViewsController.getRegister)

router.get('/login', publicAccess, ViewsController.getLogin)

router.get('/', privateAccess, ViewsController.getProfile)

router.get('*', ViewsController.get404)

module.exports = router; 