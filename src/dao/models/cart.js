const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: {
        type:[{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'items'
            },
            quantity: Number
        }],
        default: []
    }
})

const cartModel = mongoose.model('carts', cartSchema)

module.exports = cartModel; 