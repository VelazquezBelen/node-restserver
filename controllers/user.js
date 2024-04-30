const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
    const { q, name = 'No name', apiKey } = req.query;
    res.json({
        msg: 'get API - controller',
    });
};

const putUsers = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - controller',
        id
    });
};

const postUsers = (req, res = response) => {
    const { name, age } = req.body;
    res.json({
        msg: 'post API - controller',
        name,
        age,
    });
};

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete API - controller',
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'patch API - controller',
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers,
}