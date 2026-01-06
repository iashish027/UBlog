import Post from "./Post.model.js";
import { errorHandler } from "../../utils/error.js";
import { uploadImage } from "../../services/media/images/upload.service.js";

const createPostService = async (postData, userId) => {
  if (!postData.title || !postData.content) {
    throw errorHandler(400, "Please provide all required fields");
  }

  const slug = postData.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...postData,
    slug,
    userId,
  });

  const savedPost = await newPost.save();
  return savedPost;
};

const getPostsService = async (page = 1, limit = 9, order = "desc") => {
  const skip = (page - 1) * limit;
  const sortDirection = order === "asc" ? 1 : -1;

  const posts = await Post.find()
    .sort({ updatedAt: sortDirection })
    .skip(skip)
    .limit(limit);

  const totalPosts = await Post.countDocuments();

  return {
    posts,
    totalPosts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  };
};

const getMyPostsService = async (userId, page = 1, limit = 9, order = "desc") => {
  const skip = (page - 1) * limit;
  const sortDirection = order === "asc" ? 1 : -1;

  const posts = await Post.find({ userId })
    .sort({ updatedAt: sortDirection })
    .skip(skip)
    .limit(limit);

  const totalPosts = await Post.countDocuments({ userId });

  return {
    posts,
    totalPosts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  };
};

const deletePostService = async (postId, userId) => {
  if (!postId) {
    throw errorHandler(400, "Post ID is required.");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw errorHandler(404, "Post not found.");
  }

  if (post.userId !== userId) {
    throw errorHandler(403, "You are not authorized to delete this post.");
  }

  await Post.findByIdAndDelete(postId);
  return { message: "Post deleted successfully." };
};

const uploadBlogImageService = async (fileBuffer) => {
  if (!fileBuffer) {
    throw errorHandler(400, "File not found");
  }

  const folder = "blog_images";
  const result = await uploadImage(fileBuffer, folder);
  return {
    imageUrl: result.secure_url,
    message: "file uploaded"
  };
};

const uploadBlogCoverImageService = async (fileBuffer) => {
  if (!fileBuffer) {
    throw errorHandler(400, "File not found");
  }

  const folder = "cover_images";
  const result = await uploadImage(fileBuffer, folder);
  return {
    imageUrl: result.secure_url,
    message: "file uploaded"
  };
};

export {
  createPostService,
  getPostsService,
  getMyPostsService,
  deletePostService,
  uploadBlogImageService,
  uploadBlogCoverImageService
};