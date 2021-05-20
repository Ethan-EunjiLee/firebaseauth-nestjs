import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KakaoAuthGuard } from './KakaoAuthGuard';

@Controller('auth')
export class AuthController {

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    kakaologin(@Req() req){
        return 'kakaologin';
    }
}
