const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter/indexRouter");
const guitarItemsRouter = require("./routes/guitarItemsRouter/guitarItemsRouter");
const path = require("node:path");
require("dotenv").config();

const viewsPath = path.join(__dirname, "views");
const assetsPath = path.join(__dirname, "public");
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/guitarType", guitarItemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
