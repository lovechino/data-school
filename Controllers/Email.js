const nodemailer = require('nodemailer')


const sendEmail = async (data)=>{
   try{
    const transporter = nodemailer.createTransport({
       service :'gmail' ,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        port : process.env.EMAIL_PORT
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to : data.email,
            subject : data.subject,
            text : data.message
        }
        await transporter.sendMail(mailOptions)
        console.log("thành công")
   }catch(error){
    console.log(error.message)
   }    
}

module.exports = {sendEmail}