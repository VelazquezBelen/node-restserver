const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    const [ total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const putUsers = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...userData} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userData);

    res.json({ user });
};

const postUsers = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in the DB
    await user.save();
    res.json({ user });
};

const deleteUsers = async (req, res = response) => {
    const { id } = req.params;

    // Borrado fisicamente (no recomendado)
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});  
    res.json({
        user, 
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
}