const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  )
  .catch((err) => console.log(err));
