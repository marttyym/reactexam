const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { authenticate } = require("../middleware/auth");

//Update
router.put("/:id", authenticate, async (req, res) => {
  // Verify the authenticated user is updating their own account
  if (req.authenticatedUserId !== req.params.id) {
    return res.status(403).json("You can only update your own account");
  }

  try {
    // Build update object with only allowed fields (allowlist approach)
    const updateFields = {};
    
    // Only allow updating specific fields
    if (req.body.username !== undefined) {
      updateFields.username = req.body.username;
    }
    if (req.body.email !== undefined) {
      updateFields.email = req.body.email;
    }
    if (req.body.profilePic !== undefined) {
      updateFields.profilePic = req.body.profilePic;
    }
    if (req.body.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    // Remove password from response
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", authenticate, async (req, res) => {
  // Verify the authenticated user is deleting their own account
  if (req.authenticatedUserId !== req.params.id) {
    return res.status(403).json("You can only delete your own account");
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }

    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
