const express = require("express");
const app = express();
const mongoose = require("mongoose");
const contactRoute = require("./routes/contactRoute");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const Port = process.env.PORT || 3000;

//Parsing the data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//View Engine
app.set("view engine", "hbs");
//Main route
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.use("/contact", contactRoute);

//Auth0 authentication
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "lfkmnvjknrjibghbrt",
  baseURL: "https://helloappnotruth.herokuapp.com/",
  clientID: "yRccnJkmTlNYPk0yxbz1YAO6JKVjq5k6",
  issuerBaseURL: "https://dev-jr0iokjh.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/", requiresAuth, (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});
// profile
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

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
