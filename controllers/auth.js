const {response} = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/user');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {      
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - no email find'
            });
        }

        // SI el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - status: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

} catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Someting went wrong'
        });
    }   
}

    

module.exports = {
    login
}