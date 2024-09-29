// src/api/email.route.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/want-to-join-email", async (req, res) => {
  const { name, country, occupation, email, contact } = req.body;
  console.log("form data", name, country, occupation, email, contact);

  console.log("email  body", req.body);

  // Setup Nodemailer transport using shared hosting SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // e.g., smtp.example.com
    port: 587, // or 465 for secure
    secure: process.env.NODE_ENV === "production", // true for 465, false for other ports
    auth: {
      user: "xordiboy@gmail.com",
      pass: "aesc tcrj ushj gjlc",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `${email}`, // sender address
    to: "ismailmdhossain2@gmail.com", // replace with the recipient's email
    subject: "For Getting Involved With FSDG",
    text: `Name: ${name}\nCountry: ${country}\nOccupation: ${occupation}\nEmail: ${email}\nContact: ${contact}`,
    html: `<p>Name: ${name}</p><p>Country: ${country}</p><p>Occupation: ${occupation}</p><p>Email: ${email}</p><p>Contact: ${contact}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to send email", error });
  }
});

export default router;
