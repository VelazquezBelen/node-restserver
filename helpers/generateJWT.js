const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign( payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token is not generate it');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}