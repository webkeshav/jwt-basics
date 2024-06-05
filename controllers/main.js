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

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new CustomAPIError('No token provided',401)
        }

        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
     
            const luckNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello ${decoded.username}`,secret:`Here is your authorized data your lucky number is ${luckNumber}`})
        } catch (error) {
            throw new CustomAPIError('Not authorized to access this route',401)
            
        }
    

}

module.exports = {login,dashboard}