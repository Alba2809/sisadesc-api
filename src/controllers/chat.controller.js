import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import { SubjectModel } from "../models/subject.model.js";
import { TeacherModel } from "../models/teacher.model.js";
import { UserModel } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getUsersToChat = async (req, res) => {
  try {
    const sender_id = req.user.id;

    const user = await UserModel.getById(sender_id);

    let listIds = [];

    /* if (user.role.name === "teacher") {
      const teacher = await TeacherModel.getByCurp(user.curp);
      const subjects = await SubjectModel.getSubjectsOfTeacher(teacher.id);

      listIds = await TeacherModel.getUsersToChat(
        subjects.map((subject) => subject.id),
        sender_id
      );
    } */
    /* const usersToChat = await UserModel.getByIds(listIds) */
    const usersToChat = await UserModel.getAllTest(sender_id);
    /* console.log(user.role.name, usersToChat) */
    return res.json(usersToChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al obtener los usuarios."]);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
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
      message
    );

    /* Socket IO functionality */
    const receicerSocketId = getReceiverSocketId(receiver_id);
    if (receicerSocketId) {
        /* io.to is used to send a message to a specific user */
        io.to(receicerSocketId).emit("message", messageCreated);
    }

    return res.json(messageCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al enviar el mensaje."]);
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
    console.log(error);
    res.status(500).json(["Hubo un error al obtener los mensajes."]);
  }
};
