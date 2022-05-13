const Router = require("express")
const authController = require("../controller/authController")
const router = new Router()
const controller = require("../controller/authController")

const {check} = require("express-validator") //validation = doğrulamak 

const controller = new authController()

router.post('/registration',
 [
check('username', 'username cannot be empty').notEmpty(),
check('password', 'password must be 4-10 characters long').isLength({min:4 , max:10}), //username veya passwordde bir hata varsa alır controllera getirir
],
controller.registration)

module.exports = router