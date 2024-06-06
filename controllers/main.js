const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')


const login = async (req,res)=>{
    const {username,password} = req.body

    //check in the controller
    if(!username || !password){
      throw new BadRequestError("Please provide the username and password")
    }
// just for demo generally provided by the DB
    const id = new Date().getDate()

    //try to keep the payload small
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:"User Created",token})

}

const dashboard = async (req,res)=>{
      
        const luckNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello ${req.user.username}`,secret:`Here is your authorized data your lucky number is ${luckNumber}`})
    

}

module.exports = {login,dashboard}