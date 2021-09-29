const Question = require('../models/question.model')

class QuestionController{
    static async addQuestion(req, res){
        try{
            const question = Question({
                userId:req.user._id,
                ...req.body
            })
            await question.save()
            res.status(200).send({status:true, data:question, message:"Added successfully"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async allQuestions(req, res){
        try{
            //const questions = await Question.find({}, {answers: {$slice : 1}})
            let limit = req.query._limit ?? 20
            const questions = await Question.find({})
                .limit(limit)
                .sort({
                    views: 'DESC'
                })
                .populate('userId','name, email')
                .populate('tags', '_id, name')

            res.status(200).send({status:true, data:questions, message:"All Questions"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async upVote(req, res){
        try{        
            const question = await Question.findById(req.params.id)

            if(question.votes.includes(req.user._id) ) 
                res.status(400).send({status:false, data:"", message:"Voted before"})

            question.votes.push(req.user._id)  
            await question.save()

            res.status(200).send({status:true, data:question, message:"Submitted successfully"})
    
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async downVote(req, res){
        try{        
            const question = await Question.findById(req.params.id)

            if(question.votes.includes(req.user._id) ) {
                question.votes.pull(req.user._id)  
                await question.save()
            }
            res.status(200).send({status:true, data:question, message:"Submitted successfully"})
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async singleQuestion(req, res){
        try{  
            const question = await Question.findByIdAndUpdate({_id:req.params.id},
                { "$inc": { "views": 1 } })
                .populate('userId','name email')
                .populate('tags', '_id, name')
                .populate('answers.userId', 'name email')
           
            res.status(200).send({status:true, data:question, message:"Question data"})
        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
    
        }
    }

    static async submitAnswer(req, res) {
        try{
            const question = await Question.findById(req.params.id)
                                    .populate('userId','name email')
                                    .populate('tags', '_id, name')
                                    .populate('answers.userId', 'name email')
                                    
            const answer = {answer: req.body.answer, userId: req.user._id}

            question.answers.push(answer)
            question.answersCount+=1

            await question.save()
           
            res.status(200).send({status:true, data:question, message:"Question data"})

        }catch(e){
            res.status(500).send({status:false, data:e.message, message:"Error"})
        }

    }



    
}

module.exports = QuestionController