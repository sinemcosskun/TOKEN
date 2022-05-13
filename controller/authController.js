const User = require("../model/User")
const User = require("../model/Role")
const bcrypt = require("bcryptjs")
const {calidationResult, validationResult} = require('express-validator')
const Role = require("../model/Role")

class authController{
    async registration(req, res) {
 
    try {
        
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: "Errors", errors})
    }

   // const  username = req.body.username ---- bir alt satırdaki yazımın eski yazım şekli alttaki tek satırda hallettiği için 
   //daha kullanışlı ve bu kullanılır.

    const {username, password} = req.body 
    const candidate = await User.findOne({username})
    if(candidate){
        return res.status(400).json({message: "User exist...."})
    }

    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({value: "USER"})

    const user = new User({username, password: hashPassword, roles: [userRole.value]})
    await user.save()
    res.json({message: "User successfully created"})



    } catch (error) {
        
    }

    }

    

}


module.exports = authController