import {
  createPostService,
  getPostsService,
  getMyPostsService,
  deletePostService,
  uploadBlogImageService,
  uploadBlogCoverImageService
} from "./post.service.js";

export const createPost = async (req, res, next) => {
  const savedPost = await createPostService(req.body, req.user.id);
  res.status(201).send();
};

export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const order = req.query.order || "desc";

  const result = await getPostsService(page, limit, order);
  res.status(200).json(result);
};

export const getMyPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const order = req.query.order || "desc";
  const userId = req.user.id;

  const result = await getMyPostsService(userId, page, limit, order);
  res.status(200).json(result);
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.body;
  
  const result = await deletePostService(postId, req.user.id);
  res.status(200).json(result);
};

export const blogImage = async (req, res, next) => {
  const result = await uploadBlogImageService(req.file?.buffer);
  res.status(200).json(result);
};


export const blogCoverImage = async (req, res, next) => {
  const result = await uploadBlogCoverImageService(req.file?.buffer);
  res.status(200).json(result);
};