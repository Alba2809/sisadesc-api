import { PostModel } from "../models/post.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const registerPost = async (req, res) => {
  try {
    const titleFound = await PostModel.getByTitle(req.body.title);

    if (titleFound?.length > 0)
      return res.status(400).json(["Ya existe un aviso con este título."]);

    const rowPost = await PostModel.create(req.body);

    if (rowPost.affectedRows === 1) {
      const newPost = await PostModel.getById(rowPost.insertId);

      if (newPost) {
        const userSocketId = getReceiverSocketId(req.user.id);
        if (userSocketId) {
          /* io used to emit to all users connected except the user who create the newPost */
          io.except(userSocketId).emit("post", newPost);
        }
      }
    }

    return res.json({
      post_registered: rowPost.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el aviso."]);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAll();
    return res.json(posts);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los avisos."]);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await PostModel.getById(req.params.id);
    return res.json(post);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el aviso."]);
  }
};

export const updatePost = async (req, res) => {
  try {
    const titleFound = await PostModel.getByTitleForUpdate(
      req.body.title,
      req.params.id
    );

    if (titleFound?.length > 0)
      return res.status(400).json(["Ya existe un aviso con este título."]);

    const rowPost = await PostModel.update(req.params.id, req.body);
    return res.json({
      post_updated: rowPost.affectedRows,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el aviso."]);
  }
};

export const deletePost = async (req, res) => {
  try {
    const rowPost = await PostModel.delete(req.params.id);
    return res.json({
      post_deleted: rowPost.affectedRows,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el aviso."]);
  }
};
