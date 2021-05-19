import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KakaoAuthGuard } from 'src/KakaoAuthGuard/KakaoAuthGuard';
import { KakaoStrategy } from 'src/strategy/KakaoStrategy';

@Controller('auth')
export class AuthController {

    @Get('kakao')
    @UseGuards(KakaoAuthGuard)
    kakaologin(@Req() req){
        return 'kakaologin';
    }
}
