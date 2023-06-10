// get config vars
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3030;
const communitiesRoutes = require("./routes/communityRoutes");
const activityRoutes = require("./routes/communityActivityRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/communities", communitiesRoutes);
app.use("/api/v1/communities/activities", activityRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server berhasil di running di port ${port}`);
});
