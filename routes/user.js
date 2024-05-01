
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
} = require('../controllers/user');
const { validFields } = require('../middlewares/valid-fields');
const { isRoleValid, existsEmail, existsUserId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);
router.put('/:id',[
    check('id', 'invalid id').isMongoId(),
    check('id').custom( existsUserId ),
    check('role').custom( isRoleValid ),
    validFields,
] , putUsers);
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required and min length 6').isLength({ min: 6 }),
    check('email', 'email is invalid').isEmail(),
    check('email').custom( existsEmail ),
    // check('role', 'role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validFields
], postUsers);
router.delete('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom( existsUserId ),
    validFields,
], deleteUsers);
router.patch('/', patchUsers);

module.exports = router;