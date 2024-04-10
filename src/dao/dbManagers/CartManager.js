const cartModel = require("../models/cart");
const ItemsManager = require("./ItemsManager");

class CartManager {

    //new constructor 
    constructor(){
        this.itemsManager = new ItemsManager(); 
    }

    async addCart(){
        const cart = {items: []}
        await cartModel.create(cart);
    }

    async getCart(id){
        
        const cart = await cartModel.find({_id: id}).populate('items.item').lean()

        if(!cart || cart.length == 0){
            throw new Error('card does not exist')
        }

        return cart[0]; 
    }

    async addItem(id, itemId){
        
        const cart = await this.getCart(id);

        const index = cart.items.findIndex(i=>i.item._id == itemId)
        console.log("index", index)
        if(index >= 0){
            cart.items[index].quantity+=1;  
        }else{
            cart.items.push({item: itemId, quantity:1})
        }

        await cartModel.updateOne({_id: id},cart)
    }

    /** nuevos */
    async deleteProductById(cartId, itemID){

        const cart = await this.getCart(cartId);
        const item = await this.itemsManager.getItem(itemID)

        if(!cart){
            throw new Error(`Cart with id ${cartId} does not exist`)
        }

        if(!item){
            throw new Error(`There is no item with an id of ${itemID}`)
        }

        const newContent = cart.items.filter(item=>item.item._id != itemID)

        await cartModel.updateOne({_id: cartId}, {items: newContent })

        return this.getCart(cartId);
    }

    async updateCartItems(cartId, content){
        const cart = await this.getCart(cartId);

        if(!cart){
            throw new Error(`Cart with id ${cartId} does not exist`)
        }

        await cartModel.updateOne({_id: cartId}, {items: content })

        return this.getCart(cartId);
    }

    async updateItemQuantity(cartId, itemId, quantity){

        const cart = await this.getCart(cartId);
        const item = await this.itemsManager.getItem(itemId)

        if(!cart){
            throw new Error(`Cart with id ${cartId} does not exist`)
        }

        if(!item){
            throw new Error(`There is no item with an id of ${itemID}`)
        }

        if(!quantity || isNaN(quantity) || quantity < 0){
            throw new Error('Quantity es not correct')
        }

        const itemInCartIndex = cart.items.findIndex(i=>i.item._id == itemId)
        if(itemInCartIndex < 0){
            throw new Error(`Item ${itemId} does not exist in cart`)
        }

        cart.items[itemInCartIndex].quantity = parseInt(quantity);
        console.log("itemInCartIndex", cart.items[itemInCartIndex], quantity)

        await cartModel.updateOne({_id: cartId}, cart)

        return this.getCart(cartId);
    }

    async deleteAllItems(cartId){
        const cart = await this.getCart(cartId);

        if(!cart){
            throw new Error(`Cart with id ${cartId} does not exist`)
        }

        await cartModel.updateOne({_id: cartId}, {items: [] })

        return this.getCart(cartId);
    }

}

module.exports = CartManager; 