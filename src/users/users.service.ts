import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { EUserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      username: createUserDto.username,
      password: hashedPassword,
      salt,
      role: createUserDto.role || EUserRole.GUEST,
    });

    await createdUser.save();
    return this.toResponseDto(createdUser);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  toResponseDto(user: User | null): UserResponseDto {
    const userObj = user!.toObject();
    return {
      id: userObj._id.toString(),
      username: userObj.username,
      role: userObj.role,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
    };
  }

  async findById(id: string) {
    return this.userModel.findOne({ id }).exec();
  }

  findAll() {
    return Promise.resolve(undefined);
  }

  async findByUsername(username: string) {
    try {
      return this.toResponseDto(await this.findOne(username));
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }
}
