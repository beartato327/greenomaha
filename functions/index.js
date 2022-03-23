const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "apikey",
    pass: "",
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  //const email_from = req.query.email_from;
  //const message = req.query.message;
  const email_from = "recapurro@outlook.com"
  const message = "This is a test message"

  const mailOptions = {
    from: "Green Omaha <recapurro@outlook.com>",
    to: "recapurro327@gmail.com",
    subject: "Comment",
    html: `${message} From ${email_from}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("there was an error");
      res.send(err.toString());
    }

    res.send("Your message was submitted successfully!");
  });
});
