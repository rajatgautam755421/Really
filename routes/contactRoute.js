const router = require("express").Router();
const contactModel = require("../models/contactSchema");
const nodeMailer = require("nodemailer");
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "lfkmnvjknrjibghbrt",
  baseURL: "http://localhost:3000",
  clientID: "yRccnJkmTlNYPk0yxbz1YAO6JKVjq5k6",
  issuerBaseURL: "https://dev-jr0iokjh.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("contact");
  } else {
    res.redirect("/login");
  }
});
router.post("/", async (req, res) => {
  const user = new contactModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    comment: req.body.comment,
  });
  try {
    const savedContact = await user.save();
    res.redirect("/contact");
  } catch (error) {
    res.send(error);
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gautamrajat185@gmail.com",
      pass: "1462962708",
    },
  });

  var mailOptions = {
    from: "gautamrajat185@gmail.com",
    to: `${req.body.email}`,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
