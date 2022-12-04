const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require("dotenv").config();
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

const sendEmail = (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SANDGRID_API_KEY,
    },
  });

  transporter.sendMail(
    {
      from: `abdullahsakib888@gmail.com`, // verified sender email
      to: "abdullahsakib888@gmail.com", // recipient email
      subject: "Get in touch_ Letter from my portfolio", // Subject line
      text: "Hello world!", // plain text body
      html: `
      <h3>Sender: ${data.name}</h3>
      <h4>Sender email: ${data.email}</h4>
      <h4>Message: ${data.message}</h4>
      `, // html body
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

app.get("/", (req, res) => {
  res.send("portfolio server is running");
});

app.post('/letter', (req, res) =>{
  const data = req.body;
  sendEmail(data);
  res.send({success: 'Email successfully delivered'});
  
} )

app.listen(port, () => {
  console.log(`portfolio server is running on port ${port}`);
});
