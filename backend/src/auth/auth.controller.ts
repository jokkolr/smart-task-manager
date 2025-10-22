import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return { message: 'Login successful' };
  }

  @Post('register')
  register() {
    return { message: 'User registered successfully' };
  }
}
