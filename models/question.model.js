const mongoose = require('mongoose')
const User = require('./user.model')

questionSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:50,
    },
    views:{
        type:Number,
        default:0
    },

    votes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }],
    answersCount:{
        type:Number,
        default:0
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tags",
        required:true
    }],
    answers:[{
        answer:{
            type:String,
            trim:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        votes:{
            type:Number, default:0
        },
        comments:[{
                comment:{
                    type:String,
                    trim:true

                },
                userId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"users",
                    required:true
                }
            }]
    }],


}, {timestamps:true})

//handle response
questionSchema.methods.toJSON = function(){
    const question = this.toObject()
    delete question.__v
    return question
}


questionSchema.statics.all = async(limit) => {
    
    return await Question.find({})
                .limit(limit)
                .sort({
                    views: 'DESC'
                })
                .populate('userId','name email')
                .populate('tags', '_id name')
    
}


const Question = mongoose.model('questions', questionSchema)

module.exports = Question