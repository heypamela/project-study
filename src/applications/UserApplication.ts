import { inject, injectable } from "inversify";

import { IUser } from "../database/interfaces/User.interface";
import { LoginUser } from "../interfaces/LoginUser";
import { UpdateUser } from "../interfaces/UpdateUser";
import { UserRepository } from "../repository/UserRepository";

@injectable()
export class UserApplication {
  constructor(
    @inject(UserRepository)
    private userRepository: UserRepository
  ) {}

  public async createUser(userData: IUser): Promise<string> {
    const user = await this.userRepository.findOne(userData.email);
    if (user) {
      throw console.error({
        message: "The user already exists",
      });
    }

    const newUser = await this.userRepository.save({ ...userData });

    return newUser.idUser;
  }

  public async login(data: LoginUser) {
    await this.userRepository.findOne(data.email);
  }

  public findOne(idUser: string) {
    return this.userRepository.findById(idUser);
  }

  public listUsers() {
    return this.userRepository.listUsers();
  }

  public async updateUser(userData: UpdateUser) {
    const user = await this.updateUser(userData);

    return { user };
  }
}
