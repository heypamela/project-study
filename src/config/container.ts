import "reflect-metadata";
import { Container } from "inversify";

import { UserController } from "../controllers/UserController";
import { UserApplication } from "../applications/UserApplication";
import { UserRepository } from "../repository/UserRepository";

const container: Container = new Container();

container.bind(Container).toConstantValue(container);

container.bind(UserController).toSelf();
container.bind(UserApplication).toSelf();
container.bind(UserRepository).toSelf();

export { container };
