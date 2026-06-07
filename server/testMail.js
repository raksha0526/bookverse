const nodemailer = require("nodemailer");
require("dotenv").config();

async function testMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "BookVerse Test",
      text: "Email test successful",
    });

    console.log("SUCCESS");
    console.log(info.response);
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
  }
}

testMail();