import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";

const sendPassEmail = async (to, username, password) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
  });

  const mailOptions = {
    from: {
        name: 'ViaTranquilla',
        address: process.env.EMAIL_USER
    },
    to: to,
    subject: 'Please update your password!',
    html: `Dear <b>${username}</b>,<br>
           <br>
           We have sent you a randomly generated password!<br>
           <br>
           Your new password is: <b>${password}</b>
           <br>
           <br>
           Please change it once and update it!
           This way the password is in the right hands and nothing will stand in the way of your excursions :)
           <br>
           <br>
           Warm regards,<br>
           <br>
           <b>The ViaTranquilla Crew</b><br>`
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent!")
    } catch (error) {
        console.log(error)
    }
  }
  sendMail(transporter, mailOptions)
};


export { sendPassEmail };