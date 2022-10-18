import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ mss: "Hello World!" });
});

router.post("/user", UserController.createUser);
router.get("/users", UserController.listUsers);
router.get("/user/:idUser", UserController.findOne);
router.put("/update/:idUser", UserController.updateUser);

export { router };
