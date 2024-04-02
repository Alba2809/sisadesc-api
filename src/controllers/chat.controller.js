import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import { ParentModel } from "../models/parent.model.js";
import { UserModel } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getUsersToChat = async (req, res) => {
  try {
    const sender_id = req.user.id;

    const user = await UserModel.getById(sender_id);

    let usersToChat = [];
    if (user.role.name === "counselor") {
      usersToChat = await UserModel.getCounselorConversations(sender_id);
    } else if (user.role.name === "parent") {
      usersToChat = await ParentModel.getUsersToChat(user.curp);
    }

    return res.json(usersToChat);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los usuarios."]);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message, fileData, fileName } = req.body;
    const sender_id = req.user.id;
    const receiver_id = req.params.id;

    let conversation = null;
    conversation = await ConversationModel.getConversation(
      sender_id,
      receiver_id
    );

    if (!conversation) {
      conversation = await ConversationModel.create(sender_id, receiver_id);
    }

    const messageCreated = await MessageModel.create(
      conversation.id,
      sender_id,
      receiver_id,
      message,
      fileData,
      fileName
    );

    const sender = await UserModel.getById(sender_id);

    const receicerSocketId = getReceiverSocketId(receiver_id);
    if (receicerSocketId) {
      io.to(receicerSocketId).emit("message", {
        newMessage: messageCreated,
        receiver: receiver_id,
        sender,
      });
    }

    return res.json(messageCreated);
  } catch (error) {
    res.status(500).json(["Hubo un error al enviar el mensaje."]);
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChat = req.params.id;
    const sender_id = req.user.id;

    const conversation = await ConversationModel.getConversation(
      sender_id,
      userToChat
    );

    let messages = [];
    if (conversation) {
      messages = await MessageModel.getMessages(conversation.id);
    }

    return res.json(messages);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los mensajes."]);
  }
};

export const getFileOfMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await MessageModel.getFile(messageId);
    return res.json({
      fileData: message.fileData,
      fileName: message.fileName,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el archivo."]);
  }
};
