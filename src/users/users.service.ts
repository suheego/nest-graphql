import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models/user';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    await this.users.push(user);

    return user;
  }
  public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );

    Object.assign(user, updateUserData);

    return user;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }
  public async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    return getUsersArgs.userIds.map((userId) =>
      this.users.find((user) => user.userId === userId),
    );
  }
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);

    return user;
  }
}
