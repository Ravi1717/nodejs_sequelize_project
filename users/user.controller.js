const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middlewares/validate-request');
const userService = require('./user.service');
const authorize = require('../_middlewares/authorize');


module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function registerSchema(req, res, next){
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    validateRequest(req, next, schema);
}

const authenticate = async(req, res, next)=>{
    let user = await userService.authenticate(req.body)
    .then((result)=>res.send({status:result}))
    .catch(next);
}

const register = async(req, res, next)=>{
    let user = await userService.create(req.body)
    .then((result)=>res.send({userStatus:result}))
    .catch(next);
}

const getCurrent = (req, res)=>{
    res.json(req.user)
}

//routes
router.post('/register', registerSchema, register);
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/current', authorize(), getCurrent);


