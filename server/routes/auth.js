const router= require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// only ./ and not ../ because fs is set up where we started the app
const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');

router.post('/signin', (req, res) => {
    User.findOne({ 'email' : req.body.email }).exec((err, user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                subject: user._id.toString()
            });
            res.status(200).json(token);
        } else {
            res.status(401).json('signin failed');
        }
    });
})

router.post('/signup', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
    })

    newUser.save( (err) => {
        if (err) { res.status(500).json('error signup') }
        res.status(200).json('signup ok !');
    });
})

module.exports = router;