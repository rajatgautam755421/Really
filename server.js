const express = require("express");
const app = express();
const Port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    msg: "COMMING SOON!!",
  });
});
app.listen(Port);
