const Question = require('../models/question.model')
const Tag = require('../models/tag.model')

class TagController{
    static async addTag(req, res){
        try{
            const tags = [
                {
                    "name" : "Css",
                    "description":"CSS is the language we use to style an HTML document.CSS describes how HTML elements should be displayed."
                },
                {
                    "name" : "JavaScript",
                    "description":"For questions regarding programming in ECMAScript."
                },
                {
                    "name" : "PHP",
                    "description":"PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted."
                },
                {
                    "name" : "Node.js",
                    "description":"Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library"
                },
            ]
            //const tag = Tag(req.body)
            await Tag.insertMany(tags)
            
            res.status(200).send({status:true, data:"inserted", message:"Added successfully"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async allTags(req, res){
        try{
            const tags = await Tag.find()
            
            res.status(200).send({status:true, data:tags, message:"All Tags"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async tagQuestions(req, res){
        try{
            let limit = req.query._limit ?? 20
            // const questions = await Question.all(limit)

            const questions = await Tag.questions(req.params.id)
            
            res.status(200).send({status:true, data:questions, message:"tag question"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }

    }

}

module.exports = TagController