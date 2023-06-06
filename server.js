// get config vars
require("dotenv").config();

const express = require("express");
const communitiesRoutes = require("./routes/communityRoutes");
const app = express();
const port = process.env.PORT || 3030;

app.use("/communities", communitiesRoutes);

app.listen(port, () => {
  console.log(`Server berhasil di running di port ${port}`);
});
