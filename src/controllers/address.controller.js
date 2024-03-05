import { AddressModel } from "../models/address.model.js";

export const getAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.getAll();

    res.json(addresses);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las direcciones."]);
  }
};
