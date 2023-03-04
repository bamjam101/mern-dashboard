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
      html: `
      <body style="height:'100vh', width:'100%', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 1rem', backgroundColor: '#191F45'">
        <header style="width: '100%', padding: '0.5rem 0', color: 'gold'">Richdollar</header>
        <main style="display: 'flex', flexDirection='column', gap: '1rem', width: '100%', justifyContent: 'center', alignItems: 'center'">
          <a href=${url} style="padding: '0.5rem 1rem', background: 'sky-blue', color: 'black', fontWeight: 'bold', textDecoration: 'none'">Authenticate Yourself</a>
          <p>Upon clicking the above button your authentication will be automatically completed.</p>
        </main>
    </body>`,
    });
    console.log("Email Send Successfully");
  } catch (err) {
    console.log("Email verification failed due to email dispatch error.");
    console.log(err);
  }
};
