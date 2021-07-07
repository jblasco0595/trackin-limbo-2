const { TrakedHours, User, Project, TrakedHoursCondition } = require ('../models/index')
const errors = require('../middleware/errors')
const dbModel = TrakedHours
const dbModelMsg = "TrakedHours"

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
    dbModel.findAll({
        include: ["user", "project"]
    })
    .then( response => {
        res.status( 200 ).json( response )
    })
    .catch( error => {
        errors.response(res, error)
    })
}

const show = (req, res, next) => {
    Record = dbModel.findOne({ 
        include: ["user", "project"],
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
    return dbModel.update( req.body, {
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

const existsUserId = (value) => {
    modelMsg = "user"
    return User.findOne({ 
        where: { id: value }
    })
    .then((user) => { 
        if (user === null) {
            return Promise.reject('this ' + modelMsg + ' does not exist')
        } 
    })
}

const existsProjectId = (value) => {
    modelMsg = "project"
    return Project.findOne({ 
        where: { id: value }
    })
    .then((project) => { 
        if (project === null) {
            return Promise.reject('this ' + modelMsg + ' does not exist')
        } 
    })
}

const existsId = (value) => {
    return dbModel.findOne({ 
        where: { id: value }
    })
    .then((userrole) => { 
        if (userrole === null) {
            return Promise.reject('this ' + dbModelMsg + ' does not exist')
        } 
    })
}

const isNotTrakedHoursConditionAssociated = (value) => {
    record = "trakedhours condition"
    return TrakedHoursCondition.findOne({ 
        where: { trackedHourId: value }
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
    existsUserId,
    existsId,
    existsProjectId,
    isNotTrakedHoursConditionAssociated
};