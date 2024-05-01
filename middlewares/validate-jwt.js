const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const jwtValidator = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token'
        });
    }    
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        const user = await User.findById( uid );

        if (!user) {
            res.status(401).json({
                msg: 'Invalid token - the user is not in the DB'
            })
        }


        if (!user.status) {
            res.status(401).json({
                msg: 'Invalid token - user with false status'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }    
}

module.exports = {
    jwtValidator
}