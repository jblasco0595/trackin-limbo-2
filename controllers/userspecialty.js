const { UserSpecialty, User, Specialty } = require ('../models/index')
const errors = require('../middleware/errors')
const dbModel = UserSpecialty
const dbModelMsg = "UserSpecialty"

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
        include: ["user", "specialty"]
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
        include: ["user", "specialty"],
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

const existsSpecialtyId = (value) => {
    modelMsg = "specialty"
    return Specialty.findOne({ 
        where: { id: value }
    })
    .then((specialty) => { 
        if (specialty === null) {
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

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
    existsUserId,
    existsId,
    existsSpecialtyId
};