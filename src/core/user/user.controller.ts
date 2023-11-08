import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './../../common';

import { UserService } from './user.service';
import { FindAllUserDto } from './dto';
import { UserResponse } from './types';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() findAllUserDto: FindAllUserDto): Promise<UserResponse[]> {
    const users = await this.userService.findAll(findAllUserDto);
    return users.map((user) => new UserResponse(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.userService.findById(id);
    return new UserResponse(user);
  }
}
