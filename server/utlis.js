const nodemailer = require("nodemailer");

module.exports = async (email, subject, url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log(email, url);

    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      text: `${url}`,
      html: `<div style="display: 'flex', flexDirection='column', gap: '1rem', width: '100%', justifyContent: 'center', alignItems: 'center'">
      <a href=${url} style="padding: '0.5rem 1rem', background: 'sky-blue', color: 'black', fontWeight: 'bold', textDecoration: 'none'">Verify Your Account</a>
      <p>Upon clicking on the button your account will be automatically verified and you will be redirected to our login page.</p>
    </div>`,
    });
    console.log("Email Send Successfully");
  } catch (err) {
    console.log("Email verification failed due to email dispatch error.");
    console.log(err);
  }
};
