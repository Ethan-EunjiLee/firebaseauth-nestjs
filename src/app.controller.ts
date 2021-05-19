import { Body, Controller, Get, Req, Res } from '@nestjs/common';
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
  async kakaoRedirect(@Req() req, /*@Res() res*/){
    //console.log('res: ', res);
    //console.log('res.query: ', res.query);
    //console.log('kakaoRedirect req: ', req);
    console.log('=============================');
    console.log('kakaoRedirect');
    console.log('req: ', req);
    //console.log('req.body.emailObj: ', req.body.emailObj);
    //console.log('req.emailObj: ', req.emailObj);
    return 'here is kakaoRedirect';
  }
}
