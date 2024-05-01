
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
} = require('../controllers/user');

const { isRoleValid, existsEmail, existsUserId } = require('../helpers/db-validators');
const { validateFields, isAdminRole, userHasRole, jwtValidator } = require('../middlewares/index');

const router = Router();

router.get('/', getUsers);
router.put('/:id', [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(existsUserId),
    check('role').custom(isRoleValid),
    validateFields,
], putUsers);
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required and min length 6').isLength({ min: 6 }),
    check('email', 'email is invalid').isEmail(),
    check('email').custom(existsEmail),
    // check('role', 'role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields
], postUsers);
router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    userHasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'invalid id').isMongoId(),
    check('id').custom(existsUserId),
    validateFields,
], deleteUsers);

module.exports = router;