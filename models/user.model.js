const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Question = require('./question.model')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if( !validator.isEmail(value) ) throw new Error('Invalid email address')
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        Match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    },
    activationToken:{
        type:String,
    },
    location:{
        type:String,
        trim:true,
    },
    title:{
        type:String,
        trim:true,
    },
    aboutMe:{
        type:String,
        trim:true,
    },
    image:{
        type:String,
    },
    github:{
        type:String,
        trim:true,
    },
    twitter:{
        type:String,
        trim:true,
    },

    isActive:{
        type:Boolean,
        default:false
    },
    isModerator:{
        type:Boolean,
        default:false
    },
    tokens:[ { token: {type:String, required:true} } ]

}, {timestamps:true})

//handle response
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    delete user.activationToken
    delete user.createdAt
    delete user.updatedAt
    delete user.tokens
    return user
}

//Encrypt password
userSchema.pre('save', async function(){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
    
})

//generate token
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.login = async(email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Invalid login data')
    //check if password is correct or not
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) throw new Error('Invalid login data')
    //check if user is verified or not
    if(!user.isActive) throw new Error('Please Verify your account first')
    return user
}

const User = mongoose.model('users', userSchema)

module.exports = User