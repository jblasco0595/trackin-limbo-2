const { User, UserRole, UserWorkspace, TeamMember, UserHourlyPayment, TrakedHours, UserSpecialty } = require ('../models/index')
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

const existsId = (value) => {
    return dbModel.findOne({ 
        where: { id: value }
    })
    .then((user) => { 
        if (user === null) {
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

const isNotUserRoleAssociated = (value) => {
    record = "user role"
    return UserRole.findOne({ 
        where: { userId: value }
    })
    .then((userrole) => { 
        if (userrole) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

const isNotUserWorkspaceAssociated = (value) => {
    record = "user workspace"
    return UserWorkspace.findOne({ 
        where: { userId: value }
    })
    .then((userworkspace) => { 
        if (userworkspace) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

const isNotTeamMemberAssociated = (value) => {
    record = "team member"
    return TeamMember.findOne({ 
        where: { userId: value }
    })
    .then((teammember) => { 
        if (teammember) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

const isNotUserHourlyPaymentAssociated = (value) => {
    record = "user hourly payment"
    return UserHourlyPayment.findOne({ 
        where: { userId: value }
    })
    .then((userhourlypayment) => { 
        if (userhourlypayment) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

const isNotTrakedHoursAssociated = (value) => {
    record = "traked hours"
    return TrakedHours.findOne({ 
        where: { userId: value }
    })
    .then((trakedhours) => { 
        if (trakedhours) {
            return Promise.reject('You cannot delete this ' + dbModelMsg + ' because it is related to ' + record)
        } 
    })
}

const isNotUserSpecialtyAssociated = (value) => {
    record = "user specialty"
    return UserSpecialty.findOne({ 
        where: { userId: value }
    })
    .then((userspecialty) => { 
        if (userspecialty) {
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
    notExistEmail,
    notExistUserName,
    existsId,
    isEmailAvailable,
    isUserNameAvailable,
    isNotUserRoleAssociated,
    isNotUserWorkspaceAssociated,
    isNotTeamMemberAssociated,
    isNotUserHourlyPaymentAssociated,
    isNotTrakedHoursAssociated,
    isNotUserSpecialtyAssociated
};