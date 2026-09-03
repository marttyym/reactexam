const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

//Create
router.post("/", verifyToken, async (req, res) => {
  // Use authenticated username from JWT token
  const postData = {
    ...req.body,
    username: req.user.username // Override with authenticated username
  };
  
  const newPost = new Post(postData);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json("Post not found");
    }
    
    // Verify the authenticated user owns this post
    if (post.username !== req.user.username) {
      return res.status(403).json("You can update only your post");
    }
    
    try {
      // Prevent username from being modified via request body
      const updateData = { ...req.body };
      delete updateData.username;
      
      const updatedPost = await Post.findOneAndUpdate(
        { _id: { $eq: req.params.id } },
        {
          $set: updateData,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json("Post not found");
    }
    
    // Verify the authenticated user owns this post
    if (post.username !== req.user.username) {
      return res.status(403).json("You can delete only your post");
    }
    
    try {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all posts
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
