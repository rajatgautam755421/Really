const router = require("express").Router();
const contactModel = require("../models/contactSchema");

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
    res.json(savedContact);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
