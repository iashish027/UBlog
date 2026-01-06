import Post from "./Post.model.js";
import { errorHandler } from "../../utils/error.js";
import { uploadImage } from "../../services/media/images/upload.service.js";

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

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
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

export const getMyPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const userId = req.user.userId;
    const posts = await Post.find({
      ...(userId && { userId: userId }),
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

export const deletePost = async (req, res, next) => {
  const { postId } = req.body;

  if (!postId) {
    return next(errorHandler(400, "Post ID is required."));
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(errorHandler(404, "Post not found."));
    }

    if (post.userId !== req.user.userId) {
      return next(
        errorHandler(403, "You are not authorized to delete this post.")
      );
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const blogImage = async (req,res,next) => {
  if(!req.file){
    return next(errorHandler(400, "File not found"));
  }
  const fileBuffer = req.file.buffer;
  const folder = "blog_images";

  try{
    const result = await uploadImage( fileBuffer , folder );
    res.status(200).json({
      imageUrl : result.secure_url,
      message : "file uploaded"
    })
  }
  catch(error){
    return next(errorHandler(error.http_code,error.message));
  }

}


export const blogCoverImage = async (req,res,next) => {
  if(!req.file){
    return next(errorHandler(400, "File not found"));
  }
  const fileBuffer = req.file.buffer;
  const folder = "cover_images";

  try{
    const result = await uploadImage( fileBuffer , folder );
    res.status(200).json({
      imageUrl : result.secure_url,
      message : "file uploaded"
    })
  }
  catch(error){
    return next(errorHandler(error.http_code,error.message));
  }
}