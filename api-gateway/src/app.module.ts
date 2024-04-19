import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AppService } from './services/app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'authentication-service',
        transport: Transport.GRPC,
        options: {
          package: 'authentication',
          protoPath: join('../commons/authentication_service.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
