const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
var cors = require("cors");
const app = express();
const path = require('path');

app.use(express.json(), cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => console.log("Connected"));

app.get("/", (req, res) => {
  res.send("Hello, this is your Express app!");
});


// Product Route
const productRoute = require("./routes/productRoute");
app.use("/product", productRoute , cors());

// Admin User Route
const adminRoute = require("./routes/userRoute");
app.use("/admin", adminRoute , cors());

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
