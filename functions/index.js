const functions = require("firebase-functions");
const sendgridAPI = functions.config().sendgrid.apikey;
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "apikey",
    pass: sendgridAPI,
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  const email_from = req.query.email_from;
  const message = req.query.message;
  const name = req.query.name;

  const mailOptions = {
    from: "Greener Omaha <recapurro@outlook.com>",
    to: "recapurro327@gmail.com",
    subject: "Comment",
    html: `
    <h3>Comment:</h3>
    <p>${message}</p>
    <h5>From: ${name}| Reply to Email: ${email_from}</h5>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("there was an error");
      res.send(err.toString());
    }

    res.send("Your message was submitted successfully!");
  });
});
