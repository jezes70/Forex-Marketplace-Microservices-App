import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../model/request/login.dto';
import { RegisterRequestDto } from '../model/request/register.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('create-account')
  @UsePipes(new ValidationPipe())
  signup(@Body() register: RegisterRequestDto) {
    return this.authService.register(register);
  }
}
