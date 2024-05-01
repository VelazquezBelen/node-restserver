const { response } = require("express");
const { validationResult } = require("express-validator");

const isAdminRole = ( req, res = response, next ) => {
    
    if(!req.user) {
        return res.status(500).json({
            msg: 'Validate role before token'
        });
    }

    const { role, name } = req.user;
    if( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        });
    }

    next();
}

const userHasRole = ( ...roles ) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(500).json({
                msg: 'Validate role before token'
            });
        }
        if( !roles.includes(req.user.role) ) {
            return res.status(401).json({
                msg: `To do the operation the server requires one of this roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    userHasRole
}