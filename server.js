// get config vars
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3030;
const authRoutes = require("./routes/guestRoutes");
const adminRoutes = require("./routes/adminRoutes");
const guestRoutes = require("./routes/guestRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GUEST
app.use("/api", guestRoutes);

// ADMIN
app.use("/api/v1", adminRoutes);

// USER
// app.use("/api/v2/", userRoutes);

// app.use("/api/v1/communities/activities", activityRoutes);
// app.use("/api/v1", userRoutes);
// app.use("/api/v1/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server berhasil di running di port ${port}`);
});
