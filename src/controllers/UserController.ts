import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserServices } from "../repository/UserRepository";

dotenv.config();
const userServices = new UserServices();

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUserData = { name, email, password };

    if (createUserData) {
      const newUser = await userServices.save(createUserData);

      if (newUser instanceof Error) {
        res.json({ error: newUser.message });
      } else {
        res.status(201).json({ id: newUser.idUser, name, email });
      }
    } else {
      res.json({ error: "Informações não enviadas." });
    }
  }

  static async findOne(req: Request, res: Response) {
    const { idUser } = req.params;

    const user = await userServices.findById(idUser);
    return res.status(200).json(user);
  }

  static async listUsers(res: Response) {
    const list = await userServices.listUsers();

    return res.status(200).json(list);
  }

  static async updateUser(req: Request, res: Response) {
    const { idUser } = req.params;
    const getIdUser = { idUser };

    if (getIdUser) {
      const bodyUser = req.body;

      const update = userServices.updateUser(idUser, bodyUser);
      res.status(200).json(update);
    }
  }
}
