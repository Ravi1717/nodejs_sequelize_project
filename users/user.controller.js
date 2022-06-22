const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/register', register);

module.exports = router;

function register(req, res, next){
    userService.create(req.body)
    .then(()=>res.json({message:"Registration successful"}))
    .catch(next);
}
