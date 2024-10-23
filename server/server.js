const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const NotesRoute = require("./Route/Notesrouter");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });
app.use("/api", NotesRoute);

const DB = process.env.DATABASEID;
/*
mongoose
  .connect(DB)
  .then(() => console.log("connected to the database"))
  .catch((error) => console.log("connection failed", error));
*/

const MongoConnect = async () => {
  try {
    const DB = process.env.DATABASEID.replace(
      "<db_password>",
      process.env.DATABASEPASS
    );

    await mongoose.connect(DB);
    console.log("connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

app.listen(5000, () => {
  console.log("connected to the server");
  MongoConnect();
});
