const {Shipping} = require('../models/shipping');
const express = require('express');
const router = express.Router();

// get Shipping
router.get(`/`, async (req, res)=> {
    const shippingList = await Shipping.find(); 
    
    if (!shippingList){
        res.status(500).json({success: false})
    }
    res.send(shippingList); 
})

// post Shipping
router.post(`/`, async (req, res)=> {
    let shipping = new Shipping({
        order_id: req.body.order_id,
        shipping_method: req.body.shipping_method,
        shipping_status: req.body.shipping_status,
        shipping_cost: req.body.shipping_cost,
        delivery_date: req.body.delivery_date
    })
    shipping = await shipping.save();
    
    if(!shipping)
    return res.status(404).send('the shipping cannot be created!')

    res.send(shipping);
})

// export module api Shipping 
module.exports =router;
