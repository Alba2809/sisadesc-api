import { EventsModel } from "../models/event.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getEvents = async (req, res) => {
  try {
    const events = await EventsModel.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los eventos."]);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await EventsModel.getEventsById(req.params.id);
    if (!event) return res.status(404).json(["Evento no encontrado."]);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el evento."]);
  }
};

export const getEventByDate = async (req, res) => {
  try {
    const event = await EventsModel.getEventByDate(req.params.date);
    if (!event) return res.status(404).json(["Evento no encontrado."]);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el evento."]);
  }
};

export const registerEvent = async (req, res) => {
  try {
    const result = await EventsModel.create(req.body);

    const newEvent = await EventsModel.getEventById(result.insertId);

    const userSocketId = getReceiverSocketId(req.user.id);
    if (userSocketId) {
      io.except(userSocketId).emit("newEvent", newEvent);
    }
    return res.status(200).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al registrar el evento."]);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await EventsModel.update(req.params.id, req.body);
    
    if (event.affectedRows <= 0)
    return res.status(404).json(["Evento no encontrado."]);

    const updatedEvent = await EventsModel.getEventById(req.params.id);

    const userSocketId = getReceiverSocketId(req.user.id);

    if (userSocketId) {
      io.except(userSocketId).emit("updateEvent", updatedEvent);
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al actualizar el evento."]);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await EventsModel.delete(req.params.id);

    if (event.affectedRows <= 0)
      return res.status(404).json(["Evento no encontrado."]);

    if (event.affectedRows === 1) {
      const userSocketId = getReceiverSocketId(req.user.id);
      if (userSocketId) {
        /* io used to emit to all users connected except the user who create the new Event */
        io.except(userSocketId).emit("deleteEvent", req.params.id);
      }
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el evento."]);
  }
};
