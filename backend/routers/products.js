const {Product} = require('../models/products');
const express = require('express');
const router = express.Router();

// get products
router.get(`/`, async (req, res)=> {
    const productList = await Product.find(); 
    
    if (!productList){
        res.status(500).json({success: false})
    }
    res.send(productList); 
})

// get product by id 
router.get(`/:id`, async (req, res)=> {
    const product = await Product.findById(req.params.id); 
    
    if (!product){
        res.status(500).json({success: false})
    }
    res.send(product); 
})


// post products
router.post(`/`, async (req, res)=> {
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        stock: req.body.stock
    })
     
    product = await product.save();
    
    if(!product)
    return res.status(404).send('the cart item cannot be created!')

    res.send(product);
})

// update products
router.put(`/:id`, async(req, res)=> {
    const product = await Product.findByIdAndUpdate(
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

    if(!product)
    return res.status(404).send('the cart item cannot be created!')

    res.send(product);
})

// delete cart items
router.delete(`/:id`, (req, res)=> {
    Product.findByIdAndDelete(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'product no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})


// export module api products 
module.exports =router;
