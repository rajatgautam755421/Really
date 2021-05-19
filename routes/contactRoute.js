const router = require("express").Router();
const contactModel = require("../models/contactSchema");
const nodeMailer = require("nodemailer");
router.get("/", (req, res) => {
  res.render("contact", { name: "aman" });
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

  var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "gautamrajat185@gmail.com",
      pass: 1462962708,
    },
  });
  var mailOptions = {
    from: "gautamrajat185@gmail.com",
    to: `${req.body.email}`,
    subject: "Contact  us through Emalis",
    text: `Thankyou ${req.body.name} for contacting us.We will react you soon.`,
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
