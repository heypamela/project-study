import { inject } from "inversify";

import { IUser } from "../database/interfaces/User.interface";
import { UpdateUser } from "../interfaces/UpdateUser";
import { UserServices } from "../repository/UserRepository";

export class UserApplication {
  constructor(
    @inject(UserServices)
    private userServices: UserServices
  ) {}

  public async CreateUser(userData: IUser): Promise<string> {
    const user = await this.userServices.findOne(userData.email);
    if (user)
      throw console.error({
        message: "The user already exists",
      });

    const newUser = await this.userServices.save({ ...userData });

    return newUser.idUser;
  }

  public findOne(idUser: string) {
    return this.userServices.findById(idUser);
  }

  public listUsers() {
    return this.userServices.listUsers();
  }

  public async updateUser(userData: UpdateUser) {
    const user = await this.updateUser(userData);

    return { user };
  }
}
