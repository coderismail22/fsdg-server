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
    host: "fsdgbd.org", // e.g., smtp.example.com
    port: 465, // or 465 for secure
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@fsdgbd.org",
      pass: "B@ngladesh1971",
    },
    logger: true, // Add this for logging
    debug: true, // Add this to enable debugging
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `info@fsdgbd.org`, // sender address
    to: "info@fsdgbd.org", // replace with the recipient's email
    subject: "Join With FSDG",
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
