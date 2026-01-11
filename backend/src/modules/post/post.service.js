import Post from "./Post.model.js";
import User from "../user/User.model.js";
import { ApiError } from "../../utils/error.js";
import { uploadImage } from "../../services/media/images/upload.service.js";
import mongoose from "mongoose";
const createPostService = async (postData, userId) => {
  try {
    if (!postData.title || !postData.content) {
      throw new ApiError(400, "Please provide all required fields");
    }

    const slug = postData.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...postData,
      slug,
      userId: new mongoose.Types.ObjectId(userId),
    });

    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw new ApiError(500, "Failed to create post");
  }
};

const getPostsService = async (page = 1, limit = 9, order = "desc") => {
  try {
    const skip = (page - 1) * limit;
    const sortDirection = order === "asc" ? 1 : -1;

    const posts = await Post.find()
      .sort({ updatedAt: sortDirection })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    // Get unique userIds from posts
    const userIds = [...new Set(posts.map(post => post.userId))];

    // Fetch users
    const users = await User.find({ _id: { $in: userIds } }).select('username email imageUrl');

    // Create a map for quick lookup
    const userMap = users.reduce((map, user) => {
      map[user._id.toString()] = user;
      return map;
    }, {});

    // Attach user details to posts
    const postsWithUser = posts.map(post => ({
      ...post.toObject(),
      user: userMap[post.userId] || null
    }));

    return {
      posts: postsWithUser,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    };
  } catch (error) {
    throw new ApiError(500, "Failed to fetch posts");
  }
};

const getMyPostsService = async (userId, page = 1, limit = 9, order = "desc") => {
  try {
    const skip = (page - 1) * limit;
    const sortDirection = order === "asc" ? 1 : -1;

    const posts = await Post.find({ userId })
      .sort({ updatedAt: sortDirection })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ userId });

    // Since all posts belong to the same user, fetch the user once
    const user = await User.findById(userId).select('username email imageUrl');

    // Attach user details to posts
    const postsWithUser = posts.map(post => ({
      ...post.toObject(),
      user: user || null
    }));

    return {
      posts: postsWithUser,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    };
  } catch (error) {
    throw new ApiError(500, "Failed to fetch user posts");
  }
};

const deletePostService = async (postId, userId) => {
  try {
    if (!postId) {
      throw new ApiError(400, "Post ID is required.");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new ApiError(404, "Post not found.");
    }

    if (post.userId.toString() !== userId) {
      throw new ApiError(403, "You are not authorized to delete this post.");
    }

    await Post.findByIdAndDelete(postId);
    return { message: "Post deleted successfully." };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw new ApiError(500, "Failed to delete post");
  }
};

const uploadBlogImageService = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      throw new ApiError(400, "File not found");
    }

    const folder = "blog_images";
    const result = await uploadImage(fileBuffer, folder);
    return {
      imageUrl: result.secure_url,
      message: "file uploaded"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw new ApiError(500, "Failed to upload blog image");
  }
};

const uploadBlogCoverImageService = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      throw new ApiError(400, "File not found");
    }

    const folder = "cover_images";
    const result = await uploadImage(fileBuffer, folder);
    return {
      imageUrl: result.secure_url,
      message: "file uploaded"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw new ApiError(500, "Failed to upload cover image");
  }
};

export {
  createPostService,
  getPostsService,
  getMyPostsService,
  deletePostService,
  uploadBlogImageService,
  uploadBlogCoverImageService
};