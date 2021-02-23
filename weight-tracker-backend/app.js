const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);

const DBConnectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_CONNECTION_STRING
    : process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(DBConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  )
  .catch((err) => console.log(err));

module.exports = app; // for testing
