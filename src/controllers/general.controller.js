import { PostModel } from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAll();
    return res.json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al obtener los posts."]);
  }
};
