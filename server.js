const express = require("express");
const app = express();
const mongoose = require("mongoose");
const contactRoute = require("./routes/contactRoute");
const Port = process.env.PORT || 7000;

//Parsing the data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//View Engine
app.set("view engine", "hbs");
//Main route
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/contact", contactRoute);

mongoose.connect(
  "mongodb+srv://rajat:rajat12345@cluster0.d6wqf.mongodb.net/test",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    try {
      console.log("Connected to database");
    } catch (error) {
      console.log(error);
    }
  }
);

app.listen(Port);
