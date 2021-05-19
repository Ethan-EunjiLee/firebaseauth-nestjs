import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { access } from "fs";
import passport from "passport";
import { Strategy } from 'passport-kakao';
import { UserService } from "src/user/user.service";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao'){
    constructor(
        private userService: UserService
    ){
         super({
            clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API 키
            clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
            callbackURL: 'http://localhost:3001/kakaoRedirect'// 리다이렉트 URL
         },);
    }

    validate(
        accessToken,
        refreshToken,
        profile,
        done: (err:any, user: any, info?: any) => void
    ) {
        done(null, console.log('validate -> profile: ', profile));
        // const email = {profile};
        // console.log('입력한 id 이메일: ', email);
        // const tempEmail = 'dkwo595@naver.com'
        // console.log('ethan email: ', tempEmail);
        // const user = this.userService.findOne(tempEmail);
        // console.log('user: ', user);
        // if(user){ //\ 일치한 경우
        //     const emailObj = {email: tempEmail};
        //     const payload = {
        //         emailObj,
        //         accessToken
        //     };
        //     done(null, payload);
        //     return payload;
        

    }
}


