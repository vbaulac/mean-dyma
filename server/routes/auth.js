const router= require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// only ./ and not ../ because fs is set up where we started the app
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');
const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');

router.post('/signin', (req, res) => {
    User.findOne({ 'email' : req.body.email }).exec((err, user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: '15s', // durrée de vie du token
                subject: user._id.toString()
            });
            res.status(200).json(token);
        } else {
            res.status(401).json('signin failed');
        }
    });
});

router.get('/refresh-token', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
            if (err) { return res.status(403).json('wrong token'); }
            const newToken = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: '15s', 
                subject: decoded.sub
            });

            return res.status(200).json(newToken);
        })
    } else {
        res.json(403).json('no token to refresh !');
    }
});

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
});

module.exports = router;