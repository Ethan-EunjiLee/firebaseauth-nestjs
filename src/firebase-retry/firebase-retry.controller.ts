import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { json } from 'express';

//fireabse-admin
import * as admin from 'firebase-admin';
import { FirebaseUserInfoDto } from 'src/dto/FirebaseUserInfo.Dto';
import { FirebaseRetryService } from './firebase-retry.service';

@Controller('firebase-retry')
export class FirebaseRetryController {

    constructor(
        private readonly firebaseRetryService: FirebaseRetryService
    ){}

    // firebase auth를 이용해 유저 등록
    // 로그인 후 토큰 부여
    // 넘어오는 값 email, pw
    @Post('signup')
    async firebaseSignup(@Body() userInfo:FirebaseUserInfoDto, @Res() res){
        console.log('firebase-retry/signup');
        console.log('signup userInfo: ', userInfo);
        // 회원가입 처리 후 성공하면 true, 실패하면 false 반환
        const isSignUp = await this.firebaseRetryService.signup(userInfo);
        console.log('Controller isSignup: ', isSignUp);
        if(isSignUp){
            console.log('회원가입 성공');
            // token 발급
            const token = await this.firebaseRetryService.giveToken(userInfo.email);
            console.log('token: ', token);

            // 회원가입 성공한 경우 response 201
            res.status = 201;
            res.send(JSON.stringify({
                'token' : token,
                'signup' : 'success'
            }));

        } else {
            console.log('회원가입 실패');
            // 회원가입 실패한 경우 response 404
            res.statusCode = 404;
            res.send(JSON.stringify('signup Fail'));
        }
    }
    
    // 로그인: 입력한 로그인 정보 일치 여부 확인 -> 토큰 부여
    @Get('customToken')
    async login(@Body() userInfo:FirebaseUserInfoDto, @Res() res){

        // TODO: 일치 여부 확인
        
        // 일치하면 토큰 부여
        const token = await this.firebaseRetryService.giveToken(userInfo.email);
        res.send(token);        
    }
}
