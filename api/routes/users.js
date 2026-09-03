const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/auth");

//Update
router.put("/:id", verifyToken, async (req, res) => {
  // Verify the authenticated user is updating their own account
  if (req.user.userId !== req.params.id) {
    return res.status(403).json("You can update only your account!");
  }
  
  try {
    // Prevent userId from being modified via request body
    const updateData = { ...req.body };
    delete updateData.userId;
    
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json("User not found");
    }
    
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  // Verify the authenticated user is deleting their own account
  if (req.user.userId !== req.params.id) {
    return res.status(403).json("You can delete only your account!");
  }
  
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json("User not found");
    }
    
    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
});


//Get user

router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
