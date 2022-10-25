import { inject } from "inversify";
import { Request, Response } from "express";
import {
  controller,
  interfaces,
  request,
  response,
} from "inversify-express-utils";

import { UserApplication } from "../applications/UserApplication";
import { container } from "../config/container";

@controller("/user")
export class UserController implements interfaces.Controller {
  constructor(
    @inject(UserApplication) private userApplication: UserApplication
  ) {
    this.userApplication = container.get(UserApplication);
  }

  async createUser(@request() req: Request, @response() res: Response) {
    try {
      const { name, email, password } = req.body;
      const createUserData = { name, email, password };

      if (createUserData) {
        const newUser = await this.userApplication.createUser(createUserData);

        if (!newUser) {
          res.json({ error: "Informações não enviadas." });
        } else {
          res.json({ id: newUser, name, email });
        }
      }
    } catch (error) {
      return error;
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userApplication.findOne(email);
  }

  async findOne(req: Request, res: Response) {
    const { idUser } = req.params;

    const user = await this.userApplication.findOne(idUser);
    return res.status(200).json(user);
  }

  async listUsers(@response() res: Response) {
    const list = await container.get(UserApplication).listUsers();

    return { list };
  }

  async updateUser(req: Request, res: Response) {
    const { idUser } = req.params;
    const getIdUser = { idUser };

    if (getIdUser) {
      const bodyUser = req.body;

      const update = this.userApplication.updateUser(bodyUser);
      res.status(200).json(update);
    }
  }
}
