const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.mailgun_API,
    domain: process.env.mailgun_domain,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));
const sendMail = async (name, email, subject, text, cb) => {
  const mailOptions = {
    sender: name,
    from: email,
    to: "chabandou@gmail.com",
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });

  // Exporting the sendmail
};

module.exports = sendMail;