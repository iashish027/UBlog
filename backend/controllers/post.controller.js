import Post from "../models/Post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  try {
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.userId,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find()
      .sort({ updatedAt: sortDirection })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    
    res.status(200).json({
      posts,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPosts = async (req,res,next)=>{
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const userId = req.user.userId;
      const posts = await Post.find({
        ...(userId && {userId: userId})
      })
        .sort({ updatedAt: sortDirection })
        .skip(skip)
        .limit(limit);

      const totalPosts = await Post.countDocuments();

      res.status(200).json({
        posts,
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
      });
    } catch (error) {
      next(error);
    }
};
