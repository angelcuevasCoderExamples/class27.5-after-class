const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const itemSchema = new mongoose.Schema({
    description: {
        type:String 
    },
    category: String,
    price: Number
})
itemSchema.plugin(mongoosePaginate)
const itemModel = mongoose.model('items', itemSchema)

module.exports = itemModel; 