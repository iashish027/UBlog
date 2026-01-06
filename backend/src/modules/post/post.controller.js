import { errorHandler } from "../../utils/error.js";
import {
  createPostService,
  getPostsService,
  getMyPostsService,
  deletePostService,
  uploadBlogImageService,
  uploadBlogCoverImageService
} from "./post.service.js";

export const createPost = async (req, res, next) => {
  try {
    const savedPost = await createPostService(req.body, req.user.userId);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order || "desc";

    const result = await getPostsService(page, limit, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order || "desc";
    const userId = req.user.userId;

    const result = await getMyPostsService(userId, page, limit, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.body;

  try {
    const result = await deletePostService(postId, req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const blogImage = async (req, res, next) => {
  try {
    const result = await uploadBlogImageService(req.file?.buffer);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const blogCoverImage = async (req, res, next) => {
  try {
    const result = await uploadBlogCoverImageService(req.file?.buffer);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}