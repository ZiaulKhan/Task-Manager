const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);

const mongoUrl = "mongodb://127.0.0.1:27017/taskManagerDb";
//mongoose connectivity
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("db is connected");
  })
  .catch((e) => {
    console.log(`${e}`);
  });

const port = 8000;

app.listen(port, () => console.log(`server is running at ${port}`));
