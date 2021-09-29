const User = require('../models/user.model')
const sendEmail = require('../helpers/sendActivationEmail.helper')
const jwt = require('jsonwebtoken')
const Question = require('../models/question.model')

class UserController{
    static async register(req, res) {
        try{
            //generate unique activation token using jwt
            const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET)
            const url = process.env.ACTIVE_URL+"?token="+token
    
            const user = User({
                ...req.body,
                activationToken : token
            })
            await user.save()
            sendEmail(user.email, url)
    
            res.status(200).send({status:true, data:user, message:"Registerd successfully"})
    
        }catch(e){
            res.status(400).send({status:false, data:e.message, message:"Error in register"})
    
        }
    }
    
    //how to make this link only available for specific time
    static async verify(req, res) {
        try{
            const user = await User.findOne({ activationToken: req.query.token})
            user.isActive = true
            await user.save()
            res.status(200).send({status:true, data:user, message:"verified successfully"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async login(req, res) {
        try{
            const user = await User.login(req.body.email, req.body.password)
            const token = await user.generateToken()

            res.status(200).send({status:true, data:{user:user, token:token}, message:"Login successfully"})

        }catch(e){
            res.status(401).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async logout(req, res){
        try{
            req.user.tokens = req.user.tokens.filter(singleToken =>{
                return singleToken.token != req.token
            })
            req.user.save()
            res.status(200).send({status:true, data:"", message:"Logout successfully"})

        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }

    }

    static async update(req, res){
        try{
            const user = req.user

            for(let key in req.body){
                user[key] = req.body[key]
            }
            await user.save()
            res.status(200).send({status:true, data:user, message:"Updated successfully"})

        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }


    static async profile(req, res){
        try{
            const user = req.user
            const askedQuestions = await Question.find( { userId: user._id } )
        
            const answeredQuestions = await Question.find( { 'answers.userId': user._id } )

            res.status(200).send({
                status:true,
                data:{user:user, askedQuestions:askedQuestions, answeredQuestions},
                message:"user profile"})

        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }  
    }

    static async uploadImage(req, res){
        try{
            const user = req.user
            user.image =  req.file.path.replace(/\\/g, '/')
            await user.save()
            res.status(200).send({status:true, data:user, message:"uploaded"})

        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }  

    }
}

module.exports = UserController