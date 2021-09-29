require('dotenv').config()
const nodemailer = require('nodemailer')

const smptConfig = {
    service:'gmail',
    auth:{
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD
    }
}


const send = (reciever, url) => {
    try{
        const transporter = nodemailer.createTransport(smptConfig)
        let mailOptions = {
            from:"OverStackFlow",
            to:reciever,
            subject:"OverStackFlow",
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+url+">Click here to verify</a>"
        }
        transporter.sendMail(mailOptions)

    }catch(e){
        console.log(e)
    }

}

module.exports = send