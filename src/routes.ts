import { Router, Request, Response } from "express";
import { container } from "./config/container";

import { UserController } from "./controllers/UserController";

const router = Router();
let userController: UserController;

userController = container.get(UserController);

router.get("/", (req: Request, res: Response) => {
  return res.json({ mss: "Hello World!" });
});

router.post("/user", userController.createUser);
router.post("/login", userController.login);

router.get("/users", userController.listUsers);
router.get("/user/:idUser", userController.findOne);

router.put("/update/:idUser", userController.updateUser);

export { router };
