const { User, Range, Client, UserBank, Payments, Balance, BssAccount, Transaction, BssBalance } = require ('../models/index')
const errors = require('../middleware/errors')
const bcrypt = require ('bcrypt')
const salt = bcrypt.genSaltSync (10)

const dbModel = User
const dbModelMsg = "user"

const store = (req, res, next) => {
    var hashPassword = bcrypt.hashSync (req.body.password, salt)
    dbModel.create({ 
        ...req.body, 
        password: hashPassword
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
    var hashPassword = bcrypt.hashSync (req.body.password, salt)

    return dbModel.update( {
        ...req.body,
        password: hashPassword
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

const notExistEmail = (value) => {
    return dbModel.findOne({ 
        where: { email: value }
    })
    .then((user) => { 
        if (user) {
            return Promise.reject('Email already in use');
        } 
    });
}

const notExistUserName = (value) => {
    return dbModel.findOne({ 
        where: { userName: value }
    })
    .then((user) => { 
        if (user) {
            return Promise.reject('Email already in use');
        } 
    });
}

/* const isNotClientAssociated = (value) => {
    record = "client"
    return Client.findOne({ 
        where: { userId: value }
    })
    .then((client) => { 
        if (client) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
} */

const existsId = (value) => {
    return dbModel.findOne({ 
        where: { id: value }
    })
    .then((range) => { 
        if (range === null) {
            return Promise.reject('this ' + dbModelMsg + ' does not exist')
        } 
    })
}

const isEmailAvailable = (email, id) => {
    
    return User.findOne({
        where: { email }
    })
    .then((posibleUser) => {
        if (posibleUser) {
            if (email == posibleUser.email && id != posibleUser.id) {
                return Promise.reject('this email alrready in use')
            } else {
                return true
            }
        } else {
            return true
        }
    })
}

const isUserNameAvailable = (userName, id) => {
    
    return User.findOne({
        where: { userName }
    })
    .then((posibleUser) => {
        if (posibleUser) {
            if (userName == posibleUser.userName && id != posibleUser.id) {
                return Promise.reject('this userName alrready in use')
            } else {
                return true
            }
        } else {
            return true
        }
    })
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
    notExistEmail,
    notExistUserName,
    existsId,
    isEmailAvailable,
    isUserNameAvailable
    /* isNotClientAssociated, */
};