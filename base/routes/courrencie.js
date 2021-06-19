var express = require('express')
var router = express.Router()
const controller = require('../controllers/courrencie')
const { check, param } = require('express-validator')
const validator = require('../middleware/validator')

// user CRUD
router.get('/', controller.index)

router.post(
    '/store',
    check('name')
        .not().isEmpty()
        .withMessage('courrencie required!'),
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
    param('id')
        .custom(controller.existsId),
    check('name')
        .not().isEmpty()
        .withMessage('courrencie required!'),
    validator.returnErrors, 
    controller.update
)

router.delete(
    '/delete/:id', 
    param('id')
        .custom(controller.existsId),
    validator.returnErrors,
    controller.destroy)

module.exports = router;