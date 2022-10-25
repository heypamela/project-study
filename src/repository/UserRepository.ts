//import { bcrypt } from "bcrypt";
import { Repository } from "typeorm";
import { injectable } from "inversify";

import { UpdateUser } from "../interfaces/UpdateUser";
import { AppDataSource } from "../database/data-source";
import { UserModel } from "../database/models/userModel";
import { IUser } from "../database/interfaces/User.interface";

@injectable()
export class UserRepository {
  public async save(data: IUser): Promise<UserModel> {
    // const hash = bcrypt.hashSync(data.password, 10);
    return this.repository.save({ ...data });
  }

  public findOne(email: string): Promise<UserModel> {
    return this.repository
      .createQueryBuilder("user")
      .where("email = :email", { email })
      .getOne();
  }

  public findById(idUser: string): Promise<UserModel> {
    return this.repository.findOne({ where: { idUser } });
  }

  public listUsers() {
    return this.repository.find();
  }

  public updateUser(idUser: string, { name, email, password }: UpdateUser) {
    return this.repository
      .createQueryBuilder()
      .update(UserModel)
      .set({
        name,
        email,
        password,
      })
      .where("idUser = :idUser", { idUser: idUser })
      .execute();
  }

  private get repository(): Repository<UserModel> {
    return AppDataSource.getRepository(UserModel);
  }
}
