var express = require('express')
var router = express.Router()
const controller = require('../controllers/users')
const { check, param } = require('express-validator')
const validator = require('../middleware/validator')

// user CRUD
router.get('/', controller.index)

router.post(
    '/store',
    check('email')
        .not().isEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Email format invalid!')
        .custom(controller.notExistEmail)
        .normalizeEmail(),
    check('password')
        .not().isEmpty()
        .withMessage('Password required!')
        .isStrongPassword()
        .withMessage('Password must be stronger!'),
    check('userName')
        .not().isEmpty()
        .withMessage('userName required!')
        .custom(controller.notExistUserName),
    validator.returnErrors,
    controller.store
)

router.get(
    '/show/:id',
    param('id').custom(controller.existsId),
    validator.returnErrors,
    controller.show
)

router.put(
    '/update/:id',
    param('id').custom(controller.existsId),
    check('email')
        .not().isEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Email format invalid!')
        .normalizeEmail()
        .custom((email, {req}) => {
            return controller.isEmailAvailable(email, req.params.id)
        }),
    check('password')
        .not().isEmpty()
        .withMessage('Password required!')
        .isStrongPassword()
        .withMessage('Password must be stronger!'),
    check('userName')
        .not().isEmpty()
        .withMessage('userName required!')
        .custom((userName, {req}) => {
            return controller.isUserNameAvailable(userName, req.params.id)
        }),
    validator.returnErrors, 
    controller.update
)

router.delete(
    '/delete/:id', 
    /* param('id').custom(), */
    param('id')
        .custom(controller.existsId),
    validator.returnErrors,
    controller.destroy)

module.exports = router;