const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.json(users);
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  let user = await User.findOne({ username });

  if (user)
    return res.status(400).send({ message: "Username already in use." });

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = new User({ username, password, weightEntries: [] });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  const token = user.generateAuthToken();
  console.log("token");
  console.log(token);

  return res.status(201).json({
    message: "User created!",
    user: {
      _id: user._id,
      username: user.username,
      weightEntries: user.weightEntries,
    },
    token,
  });
});

router.post("/weight", auth, async (req, res) => {
  const newWeightEntry = { weight: req.body.weight, date: req.body.date };

  const user = await User.findById(req.user._id);

  const weightIndex = user.weightEntries.findIndex(
    (x) => x.date.toDateString() === date.toDateString()
  );

  if (weightIndex === -1) user.weightEntries.push(newWeightEntry);
  else user.weightEntries[weightIndex] = newWeightEntry;

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.status(201).json({
    message: "Weight posted!",
    user: {
      _id: user._id,
      username: user.username,
      weightEntries: user.weightEntries,
    },
  });
});

module.exports = router;
