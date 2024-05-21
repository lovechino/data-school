const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const datakey = process.env.ACCESS_TOKEN_SECRET 

const createToken = (user)=>{
    return jwt.sign({user},
        datakey,
        {
            expiresIn :'1d'
        }
    )
}

//all per
const authenToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401)
    
    jwt.verify(token,datakey,(err,data)=>{
        if(err) res.status(403)
        console.log(data)
        next()
    })
}

//admin and teacher
const authAdT = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401)
    
    jwt.verify(token,datakey,(err,data)=>{
        if(data.user.role == ''){
            
        }
    })
}


//admin

const authAd = (req,res,next)=>{

}

module.exports = {
    createToken,
    authenToken
}