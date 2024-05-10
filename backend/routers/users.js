const {Users} = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// get Users tanpa menampilkan password
router.get(`/`, async (req, res)=> {
    const userList = await Users.find().select('-password');
    
    if (!userList){
        res.status(500).json({success: false})
    }
    res.send(userList); 
})

// get User by id tanpa menampilkan password
router.get(`/:id`, async (req, res)=> {
    const user = await Users.findById(req.params.id).select('-password'); 
    
    if (!user){
        res.status(500).json({success: false})
    }
    res.send(user); 
})


// post Users
router.post(`/`, async (req, res)=> {
    let user = new Users({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        profile_picture: req.body.profile_picture,
        roleAdmin: req.body.roleAdmin
    })
     
    user = await user.save();
    
    if(!user)
    return res.status(404).send('the cart item cannot be created!')

    res.send(user);
})


router.put(`/:id`, async(req, res)=> {
    const user = await Users.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            profile_picture: req.body.profile_picture,
            roleAdmin: req.body.roleAdmin
        },
        {
            new:true
        }
    )

    if(!user)
    return res.status(404).send('the cart item cannot be created!')

    res.send(user);
})

// delete cart items
router.delete(`/:id`, (req, res)=> {
    Users.findByIdAndDelete(req.params.id).then(user =>{
        if(user){
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        }else {
            return res.status(404).json({success: false, message: 'user no found!'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })

})

router.post(`/login`, async (req, res)=> {
    const user = await Users.findOne({email: req.body.email})
    const secret = process.env.secret;

    // cek email 
    if(!user) {
        return res.status(400).send('The user not found');
    }
    // cek password
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign(
            {
                userId: user.id
            }, 
            secret,
            {
                //expire 1 hari
                expiresIn : '1d'
            }
        )

        res.status(200).send({user: user.email, token: token})
    }else{
        res.status(400).send('password wrong!');
    }
})


// export module api Users 
module.exports =router;
