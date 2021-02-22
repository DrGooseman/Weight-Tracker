const router = require("express").Router();

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

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username, weightEntries: [] });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  const token = user.generateAuthToken();

  return res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    weightEntries: [],
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
    _id: user._id,
    username: user.username,
    weightEntries: user.weightEntries,
  });
});

module.exports = router;
