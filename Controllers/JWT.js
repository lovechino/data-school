const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const datakey = process.env.ACCESS_TOKEN_SECRET 
const refreshToken = process.env.REFRESH_tOKEN_SECRET

const createToken = (user)=>{
    return jwt.sign({user},
        datakey,
        {
            expiresIn :'1d'
        }
    )
}

const createRefreshToken = (data)=>{
    return jwt.sign({data}, refreshToken, {expiresIn: '7d'})
}


//all per
const authenToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401)
    
    jwt.verify(token,datakey,(err,data)=>{
        if(err) res.status(403)
        // console.log(data)
        next()
    })
}

//admin and teacher
const authAdT = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401)
    
    jwt.verify(token,datakey,(err,data)=>{
        if(data.user.role == process.env.roleA){
            res.status(403).json({message:"Không đủ quyền"})
        }else{
            // console.log(data)
            next()
        }
    })
}


//admin
const authAd = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401)
    
    jwt.verify(token,datakey,(err,data)=>{
        if(data.user.role != process.env.roleB){
            res.status(403).json({message:"Không đủ quyền"})
        }else{
            // console.log(data)
            next()
        }
    })
    
}


module.exports = {
    createToken,
    authenToken,
    authAdT,
    authAd,
    createRefreshToken
}