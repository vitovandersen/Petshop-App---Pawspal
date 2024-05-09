const {Payments} = require('../models/payments');
const express = require('express');
const router = express.Router();

// get Payments
router.get(`/`, async (req, res)=> {
    const paymentList = await Payments.find(); 
    
    if (!paymentList){
        res.status(500).json({success: false})
    }
    res.send(paymentList); 
})

// post Payments
router.post(`/`, async (req, res)=> {
    const payment = new Payments({
        order_id: req.body.order_id,
        amount: req.body.amount,
        payment_date: req.body.payment_date,
        payment_status: req.body.payment_status,
        payment_method: req.body.payment_method
    })
     
    payment.save().then((createdPayment=> {
        res.status(201).json(createdPayment)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// export module api Payments 
module.exports =router;
