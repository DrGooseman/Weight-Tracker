const router = require("express").Router();

const Group = require("../models/group");
const User = require("../models/user");

router.get("/", async (req, res) => {
  let groups;
  try {
    groups = await Group.find();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.json(groups);
});

router.get("/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  let group;
  try {
    group = await Group.findById(groupId).populate({ path: "users" });
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.json(group);
});

router.post("/add", async (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;
  const newGroup = new Group({ name, users: [{ _id: userId }] });

  try {
    await newGroup.save();
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }

  return res.status(201).json("Group Created!");
});

module.exports = router;
