import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import * as mangoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!mangoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
