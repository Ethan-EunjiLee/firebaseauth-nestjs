import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import passport, { authenticate } from "passport";
import { Strategy } from "passport-kakao";

import { UserService } from "src/user/user.service";
@Injectable()
export class KakaoStrategy{
    // 카카오로 넘어는 가는데 정보를 전혀 가져오지 않는다.
    constructor(
        private userService: UserService
    ){
        this.init();
        //  super({
        //     clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API 키
        //     clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
        //     callbackURL: 'http://localhost:3001/kakaoRedirect'// 리다이렉트 URL
        //  }, )
    }

    init(){
        console.log('init() start');
        passport.use(new Strategy({
            clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API 키
            clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
            callbackURL: 'http://localhost:3001/kakaoRedirect'
        }, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
            const profile_json = profile._json;
            console.log('json데이터 확인: ', profile_json);
            console.log('hi');
            return done (null, profile);
        }))
    }
} 