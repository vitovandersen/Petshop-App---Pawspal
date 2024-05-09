const {OrderDetail} = require('../models/order_detail');
const express = require('express');
const router = express.Router();

// get products
router.get(`/`, async (req, res)=> {
    const orderDetailList = await OrderDetail.find(); 
    
    if (!orderDetailList){
        res.status(500).json({success: false})
    }
    res.send(orderDetailList); 
})

// post order detail
router.post(`/`, async (req, res)=> {
    let orderDetail = new OrderDetail({
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total_price: req.body.total_price
    })
    orderDetail = await orderDetail.save();
    
    if(!orderDetail)
    return res.status(404).send('the cart item cannot be created!')

    res.send(orderDetail);
})

// update order detail
router.put(`/:id`, async(req, res)=> {
    const orderDetail = await OrderDetail.findByIdAndUpdate(
        req.params.id,
        {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price
        },
        {
            new:true
        }
    )

    if(!orderDetail)
    return res.status(404).send('the cart item cannot be created!')

    res.send(orderDetail);
})

// delete cart items
router.delete(`/:id`, (req, res)=> {
    OrderDetail.findByIdAndDelete(req.params.id).then(orderDetail =>{
        if(orderDetail){
            return res.status(200).json({success: true, message: 'the orderDetail is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'orderDetail no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})

// export module api  
module.exports =router;
