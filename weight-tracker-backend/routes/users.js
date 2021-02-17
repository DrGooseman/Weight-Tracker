const router = require("express").Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.json(users);
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username, weightEntries: [] });

  try {
    newUser.save();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.status(201).json("User Added!");
});

module.exports = router;
