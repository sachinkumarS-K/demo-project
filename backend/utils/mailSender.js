const nodemailer = require("nodemailer");
require("dotenv").config()
const mailSender = async(email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "sachinraj.s.r.123456@gmail.com",
            pass: "zuvy kyut hfgh dhzy",
          },
        });
        let info = await transporter.sendMail({
            from: "Sachin Kumar || Developer",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });
        console.log(info);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;