const {CartItems} = require('../models/cart_items');
const express = require('express');
const router = express.Router();

// get cart items
router.get(`/`, async (req, res)=> {
    const cartItemList = await CartItems.find(); 
    
    if (!cartItemList){
        res.status(500).json({success: false})
    }
    res.send(cartItemList); 
})

// get cart item by id 
router.get(`/:id`, async (req, res)=> {
    const cartItemList = await CartItems.findById(req.params.id); 
    
    if (!cartItemList){
        res.status(500).json({success: false})
    }
    res.send(cartItemList); 
})

// post cart Item
router.post(`/`, async (req, res)=> {
    let cartItem = new CartItems({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        service_id: req.body.service_id,
        quantity: req.body.quantity
    })
    cartItem = await cartItem.save();
    
    if(!cartItem)
    return res.status(404).send('the cart item cannot be created!')

    res.send(cartItem);
})  

// update cart item
router.put(`/:id`, async(req, res)=> {
    const cartItem = await CartItems.findByIdAndUpdate(
        req.params.id,
        {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            service_id: req.body.service_id,
            quantity: req.body.quantity
        },
        {
            new:true
        }
    )

    if(!cartItem)
    return res.status(404).send('the cart item cannot be created!')

    res.send(cartItem);
})

// delete cart items
router.delete(`/:id`, (req, res)=> {
    CartItems.findByIdAndDelete(req.params.id).then(cartItem =>{
        if(cartItem){
            return res.status(200).json({success: true, message: 'the cartItem is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'cartItem no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})


// export module api products 
module.exports =router;
