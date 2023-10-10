 const express = require('express')
 const routes = express.Router()
 const Usercontroller = require('../controller/user')


 routes.post('/register',Usercontroller.register)
 routes.post('/login',Usercontroller.login)


 module.exports = routes