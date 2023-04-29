const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5001;
const app = express();

// rateLimit
const limiter = rateLimit({
  windowMs: 60 * 1000, //60 seconds
  max: 10,
});
app.use(limiter);
app.set("trust proxy", 1);

// set static folder
app.use(express.static("public"));

// Routes
app.use("/api", routes);

// Enable cors
app.use(cors());

app.listen(PORT, (req, res) => {
  console.log("Server started at port:", PORT);
});
