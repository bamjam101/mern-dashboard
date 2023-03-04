const nodemailer = require("nodemailer");
const path = require("path");
const handlebars = require("nodemailer-express-handlebars");

module.exports = async (email, subject, url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };

    transporter.use("compile", handlebars(handlebarOptions));

    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      template: "email",
      text: `${url}`,
      context: {
        url,
      },
    });
    console.log("Email Send Successfully");
  } catch (err) {
    console.log("Email verification failed due to email dispatch error.");
    console.log(err);
  }
};
