var express = require('express')
var router = express.Router()
const controller = require('../controllers/project')
const { param, body } = require('express-validator')
const validator = require('../middleware/validator')

// userbank CRUD
router.get('/', controller.index)

router.post(
    '/store',
    body('teamId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsTeamId),
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
    body('teamId')
        .isInt()
        .withMessage('only numbers can be entered!')
        .custom(controller.existsTeamId),
    validator.returnErrors,
    controller.update
)

router.delete(
    '/delete/:id', 
    param('id')
        .custom(controller.existsId)
        .custom(controller.isNotTrakedHoursAssociated),
    validator.returnErrors,
    controller.destroy
)

module.exports = router;