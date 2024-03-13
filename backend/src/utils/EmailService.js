import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (to, username) => {
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
    subject: 'Thank You for Registration!',
    html: `Dear <b>${username}</b>,<br>
           <br>
           Thank you for registering on our platform! We are thrilled to welcome you to our<br>
           community. Expect exciting updates, exclusive content, and special offers delivered<br>
           to your inbox. <br>
           <br>
           Stay tuned for valuable insights, and thank you for joining us!<br>
           <br>
           Warm regards,<br>
           <br>
           <b>ViaTranquilla</b><br>`
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


export { sendConfirmationEmail };