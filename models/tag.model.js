const mongoose = require('mongoose')
const Question = require('./question.model')

tagSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },

}, {timestamps:true})

//handle response
tagSchema.methods.toJSON = function(){
    const tag = this.toObject()
    delete tag.__v
    return tag
}

tagSchema.statics.questions = async(id) => {
    return await Question.find({ "tags": { _id: id } })
                        .populate('tags', 'id name')
}



const Tag = mongoose.model('tags', tagSchema)

module.exports = Tag