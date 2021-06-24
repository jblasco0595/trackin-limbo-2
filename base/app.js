var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var specialtyRouter = require('./routes/specialty');
var roleRouter = require('./routes/role');
var courrencieRouter = require('./routes/courrencie');
var workSpaceRouter = require('./routes/workspace');
/* var conditionRouter = require('./routes/condition');
var teamRouter = require('./routes/team');
var settingsRouter = require('./routes/settings');
var userRoleRouter = require('./routes/userrole');
var userWorkspaceRouter = require('./routes/userworkspace');
var teamMemberRouter = require('./routes/teammember');
var hourlyPaymentRouter = require('./routes/hourlypayment');
var userHourlyPaymentRouter = require('./routes/userhourlypayment');
var trakedHoursRouter = require('./routes/trakedhours');
var trakedHoursConditionRouter = require('./routes/trakedhourscondition');
var userSpecialtyRouter = require('./routes/userspecialty'); */


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/specialty', specialtyRouter);
app.use('/role', roleRouter);
app.use('/courrencie', courrencieRouter);
app.use('/workspace', workSpaceRouter);
/* app.use('/condition', conditionRouter);
app.use('/team', teamRouter);
app.use('/settings', settingsRouter);
app.use('/userrole', userRoleRouter);
app.use('/userworkspace', userWorkspaceRouter);
app.use('/teammember', teamMemberRouter);
app.use('/hourlypayment', hourlyPaymentRouter);
app.use('/userhourlypayment', userHourlyPaymentRouter);
app.use('/trakedhours', trakedHoursRouter);
app.use('/trakedhourscondition', trakedHoursConditionRouter);
app.use('/userspecialty', userSpecialtyRouter); */

module.exports = app;
