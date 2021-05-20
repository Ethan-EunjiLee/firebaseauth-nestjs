import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { AppModule } from './app.module';


import { Strategy as KakaoStrategy } from 'passport-kakao'
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  passport.use(new KakaoStrategy({
    clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API 키
    clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
    callbackURL: 'http://localhost:3001/kakaoRedirect'// 리다이렉트 URL
  },(accessToken, refreshToken, profile, done) => {
    const profile_json = profile._json;
    console.log('josn데이터 확인: ',profile_json);
    done(null, profile_json);
  }));

  await app.listen(3001);
}
bootstrap();


