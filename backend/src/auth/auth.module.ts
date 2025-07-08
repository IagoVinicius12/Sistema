import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}