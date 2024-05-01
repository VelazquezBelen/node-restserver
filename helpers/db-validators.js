const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const existsRole = await Role.findOne({role});
    if (!existsRole) {
        throw new Error(`role ${role} is not register in the DB`);
    }
}

const existsEmail = async(email = '') => {
    const emailExists = await User.findOne({email});
    if (emailExists) {
        throw new Error(`email ${email} is already register`);
    }
}

const existsUserId = async(id = '') => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`id ${id} does not exist`);
    }
}

module.exports = {
    isRoleValid,
    existsEmail,
    existsUserId
}