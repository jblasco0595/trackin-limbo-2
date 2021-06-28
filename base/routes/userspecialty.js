var express = require('express')
var router = express.Router()
const controller = require('../controllers/userspecialty')
const { param, body } = require('express-validator')
const validator = require('../middleware/validator')

// userbank CRUD
router.get('/', controller.index)

router.post(
    '/store',
    body('userId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsUserId),
    body('specialtyId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsSpecialtyId),
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
    body('userId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsUserId),
    body('specialtyId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsSpecialtyId),
    validator.returnErrors,
    controller.update
)

router.delete(
    '/delete/:id', 
    param('id').custom(controller.existsId),
    validator.returnErrors,
    controller.destroy
)

module.exports = router;