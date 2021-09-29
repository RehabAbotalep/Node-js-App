const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    try{
        //get token from header request
        const token = req.header('Authorization').replace('Bearer ', '')
        //decode token to get user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        //get user from decoded.id and token
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user) throw new Error('user not found')
        req.user= user
        req.token= token
        next()

    }catch(e){
        res.status(401).send({status: false, data: e.message, message:"UnAuthorized"})
    }
}

module.exports = auth