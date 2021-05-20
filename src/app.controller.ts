import { Body, Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 카카오 로그인 시 리다이렉트
  @Get('kakaoRedirect')
  //@UseGuards(AuthGuard('kakao'))
  async kakaoRedirect(@Req() req, @Query() query){
    //console.log('res: ', res);
    //console.log('res.query: ', res.query);
    //console.log('kakaoRedirect req: ', req);
    console.log('=============================');
    console.log('kakaoRedirect');
    //console.log('req: ', req);
    //console.log('req.body.emailObj: ', req.body.emailObj);
    //console.log('req.emailObj: ', req.emailObj);

   //console.log('query.code: ', query.code);

    return 'here is kakaoRedirect';
  }

  @Get('naverRedirect')
  naverRedirect(@Req() req){
    //console.log(req);
    console.log('naverRedirect');
    return 'here is naversRedirect';

  }


}
