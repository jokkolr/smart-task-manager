import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a user
  @Post('register')
  register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = this.usersService.createUser(name, email, password);
    return { message: 'User created successfully', user };
  }

  // Endpoint to list all users (for testing)
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
}
