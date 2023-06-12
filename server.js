// get config vars
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3030;
const adminRoutes = require("./routes/adminRoutes");
const guestRoutes = require("./routes/guestRoutes");
const userRoutes = require("./routes/userRoutes");

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GUEST
app.use("/api", guestRoutes);

// ADMIN
app.use("/api/v1", adminRoutes);

// USER
app.use("/api/v2", userRoutes);

app.listen(port, () => {
  console.log(`Server berhasil di running di port ${port}`);
});
