const {Services} = require('../models/services');
const express = require('express');
const router = express.Router();

// get Services
router.get(`/`, async (req, res)=> {
    const serviceList = await Services.find(); 
    
    if (!serviceList){
        res.status(500).json({success: false})
    }
    res.send(serviceList); 
})

// post Services
router.post(`/`, async (req, res)=> {
    let service = new Services({
        user_id: req.body.user_id,
        service_name: req.body.service_name,
        description: req.body.description
    })
    service = await service.save();
    
    if(!service)
    return res.status(404).send('the service cannot be created!')

    res.send(service);
})


// Update services
router.put(`/:id`, async(req, res)=> {
    const services = await Services.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stock: req.body.stock
        },
        {
            new:true
        }
    )

    if(!services)
    return res.status(404).send('the cart item cannot be created!')

    res.send(services);
})

// delete cart items
router.delete(`/:id`, (req, res)=> {
    Services.findByIdAndDelete(req.params.id).then(services =>{
        if(services){
            return res.status(200).json({success: true, message: 'the services is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'services no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})


// export module api Services 
module.exports =router;
