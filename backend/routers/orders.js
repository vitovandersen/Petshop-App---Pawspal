const {Orders} = require('../models/orders');
const express = require('express');
const router = express.Router();

// get orders
router.get(`/`, async (req, res)=> {
    const orderList = await Orders.find(); 
    
    if (!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList); 
})

// get orders by id 
router.get(`/:id`, async (req, res)=> {
    const order = await Orders.findById(req.params.id); 
    
    if (!order){
        res.status(500).json({success: false})
    }
    res.send(order); 
})

// post Orders
router.post(`/`, async (req, res)=> {
    let order = new Orders({
        user_id: req.body.user_id,
        order_date: req.body.order_date,
        total_price: req.body.total_price,
        payment_method: req.body.payment_method,
        payment_status: req.body.payment_status
    })
    
    order.save().then((createdOrder=> {
        res.status(201).json(createdOrder)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// update order
router.put(`/:id`, async(req, res)=> {
    const order = await Orders.findByIdAndUpdate(
        req.params.id,
        {
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            total_price: req.body.total_price,
            payment_method: req.body.payment_method,
            payment_status: req.body.payment_status
        },
        {
            new:true
        }
    )

    if(!order)
    return res.status(404).send('the cart item cannot be created!')

    res.send(order);
})

// delete Order
router.delete(`/:id`, (req, res)=> {
    Orders.findByIdAndDelete(req.params.id).then(order =>{
        if(order){
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'order no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})



// export module api products 
module.exports =router;
