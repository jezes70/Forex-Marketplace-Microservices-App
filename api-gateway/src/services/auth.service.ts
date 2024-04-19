import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/model/request/login.dto';
import { RegisterRequestDto } from 'src/model/request/register.dto';
import { LoginResponseDto } from 'src/model/response/login.response';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClient } from './authentication/authentication_grpc_pb';
import {
  LoginRequest,
  RegisterRequest,
} from '../commons/authentication_service_pb';
@Injectable()
export class AuthService {
  private authServiceClient: AuthServiceClient;

  constructor(private readonly client: ClientGrpc) {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>('AuthService');
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const request = new LoginRequest();
    request.setUsername(loginDto.username);
    request.setPassword(loginDto.password);

    const response = await this.authServiceClient.login(request);
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto.token = response.getToken();
    loginResponseDto.message = response.getMessage();
    return loginResponseDto;
  }

  async register(registerDto: RegisterRequestDto): Promise<any> {
    const request = new RegisterRequest();
    request.setUsername(registerDto.username);
    request.setPassword(registerDto.password);
    request.setEmail(registerDto.email);

    return await this.authServiceClient.register(request);
  }
}
