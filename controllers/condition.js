const { Condition, TrakedHoursCondition } = require ('../models/index')
const errors = require('../middleware/errors')
/* test */
const dbModel = Condition
const dbModelMsg = "Condition"

const store = (req, res, next) => {
    dbModel.create({ 
        ...req.body, 
    })
    .then(record => res.json(record))
    .catch( error => {
        errors.response(res, error)
    });
}

const index = (req, res, next) => {
    dbModel.findAll()
    .then( response => {
        res.status( 200 ).json( response )
    })
    .catch( error => {
        errors.response(res, error)
    })
}

const show = (req, res, next) => {
    Record = dbModel.findOne({   
        where: { id: req.params.id }
    })
    .then((record) => { 
        res.json(record) 
    })
    .catch( error => {
        errors.response(res, error)
    });
}

const update = (req, res, next) => {
    return dbModel.update( {
        ...req.body,
    }, {
        where: { id: req.params.id }
    })
    .then( (updated) => {
        if (updated) {
            res.status( 200 ).json({msg: dbModelMsg + ' updated!'})
        }
    })
    .catch( error => {
        errors.response(res, error)
    });
}

const destroy = (req, res, next) => {
    dbModel.destroy({ 
        where: { id: req.params.id }
    });
    res.json({ success: dbModelMsg + ' deleted!'})
}

const existsId = (value) => {
    return dbModel.findOne({ 
        where: { id: value }
    })
    .then((condition) => { 
        if (condition === null) {
            return Promise.reject('this ' + dbModelMsg + ' does not exist')
        } 
    })
}

const isNotTrakedHoursConditionAssociated = (value) => {
    record = "trakedhours condition"
    return TrakedHoursCondition.findOne({ 
        where: { conditionId: value }
    })
    .then((trakedhourscondition) => { 
        if (trakedhourscondition) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
    existsId,
    isNotTrakedHoursConditionAssociated
};