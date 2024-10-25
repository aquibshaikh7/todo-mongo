const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/update/:id", async (req, res) => {
  // Check if ID parameter exists
  if (!req.params.id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    // Attempt to update the item
    const updatedItem = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Check if item was found and updated
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Return the updated item
    res.json(updatedItem);
  } catch (error) {
    // Log error and send response
    console.error("Error updating item:", error);
    res.status(400).send("Invalid ID");
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//getTska
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
