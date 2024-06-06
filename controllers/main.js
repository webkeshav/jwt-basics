const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const login = async (req,res)=>{
    const {username,password} = req.body

    //check in the controller
    if(!username || !password){
      throw new CustomAPIError("Please provide the username and password",400)
    }
// just for demo generally provided by the DB
    const id = new Date().getDate()

    //try to keep the payload small
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:"User Created",token})

}

const dashboard = async (req,res)=>{

   console.log(req.user)
      
        const luckNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello ${req.user.username}`,secret:`Here is your authorized data your lucky number is ${luckNumber}`})
    

}

module.exports = {login,dashboard}