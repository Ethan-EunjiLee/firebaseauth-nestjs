import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from 'src/strategy/KakaoStrategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy]
})
export class AuthModule {}
