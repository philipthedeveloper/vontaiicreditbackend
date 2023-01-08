const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const hbs = require("nodemailer-express-handlebars");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ extended: true, limit: "50mb" }));
// app.use(cors);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: "philipowolabi79@gmail.com",
    pass: process.env.SMTPPASS,
  },
});

let options = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(options));

let attachment = [];

let Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images/");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "_" + path.extname(file.originalname);
    let realname = file.fieldname + "_" + uniqueSuffix;
    callback(null, realname);
    let newFile = { filename: realname, path: `./images/${realname}` };
    attachment.push(newFile);
  },
});

let upload = multer({
  storage: Storage,
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Helloe!!");
});

app.post("/", upload.any(), (req, res) => {
  let emailText = ``;
  for (let key in req.body) {
    if (key === "id_card" || key === "ssd" || key === "utility_bill") {
      // fs.writeFile("id_card.")
      continue;
    }
    emailText += `${key} : ${req.body[key]}/n`;
  }
  let mailOptions = {
    from: "philipowolabi79@gmail.com",
    to: "Adutem05@gmail.com",
    subject: "Vontaii Credit Consultant",
    text: "Vontaii Credit Consultant",
    template: "template",
    context: {
      body: req.body,
    },
    attachments: attachment,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      attachment = [];
      return res.json({
        message: "An error occured, please try again.",
        status: 500,
      });
    } else {
      console.log("Email sent: " + info.response);
      attachment.forEach((attachment) => {
        fs.unlink(attachment.path, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted: " + attachment.filename);
          }
        });
      });
      attachment = [];
      return res.json({
        message: "Information submitted successfully.",
        status: 200,
      });
    }
  });
});
