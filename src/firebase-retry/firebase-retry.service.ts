import { Injectable } from '@nestjs/common';
import { FirebaseUserInfoDto } from 'src/dto/FirebaseUserInfo.Dto';
import { FirebaseRetryServiceInterface } from './firebase-retry.service.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseRetryService implements FirebaseRetryServiceInterface{

    // firebase에 User 추가
    async signup(userInfo: FirebaseUserInfoDto): Promise<boolean>{
        console.log('firebaseRetryService.signup()');
        console.log('service signup userinfo: ', userInfo);

        const {email, pw} = userInfo;
        
        const exists = await this.checkUser(email);
        console.log('signup exist: ', exists);

        let isSignup;
        if(!exists){
            //console.log('admin: ', admin);
            //firebase-admin을 이용해 정보 넣기
            isSignup = await admin.auth().createUser({
                email,
                password: pw
            })
            .then((properties) => {
                const {uid, email} = properties;
                console.log(`uid: ${uid}, email: ${email}`);
                return true;
            }).catch(function(err){
                console.log('createUSer catch exception: ', err);
                return false;
            })

            return isSignup;

        } else {
            console.log('다른 이메일을 입력해주세요');
            isSignup = false;
            return isSignup;
        }
    }

    // 이메일을 이용해 회원 여부 확인
    private async checkUser(email): Promise<boolean>{

        console.log('service checkUser');
       
        const exists =  await admin.auth().getUserByEmail(email).then((user)=>{
            //일치하는 user 데이터가 있는 경우
            if(user){
                console.log('해당 이메일은 이미 가입이 되어있습니다.');
                return true;
            // 일치하는 user 데이터가 없는 경우    
            }else{
                console.log('해당 이메일로 회원가입 가능');
                return false;
            }
        }).catch(function(err){
            console.log('catch: 해당 이메일로 회원가입 가능');
            console.log('CheckUser error: ', err);
            return false;
        })
        console.log('exists: ', exists);
        return exists;   
    }

    // 커스텀 토큰 부여(회원가입 성공 후 바로 로그인 or 평범한 입력 로그인)
    // user의 uid를 활용
    async giveToken(email):Promise<any>{

        console.log('giveToken');

        //uid 얻어오기
        //uid를 얻어오지 못한 경우 false 저장
        const uid = await this.getUid(email);
        console.log('giveToken uid: ', uid);

        let token;
        if(uid!==false){
            console.log('uid!==false');
            // uid로 토큰만들기
            token = await this.createToken(uid);
        }
        console.log('giveToken token: ', token);
        return token;       
    }

    // 토큰만들기
    private async createToken(uid):Promise<any>{
        console.log('createToken()')

        const customToken = await admin.auth().createCustomToken(uid)
            .then((customToken) => {
                return customToken;
            }).catch(function(err){
                console.log('createToken() err: ', err);
                return false
            });

        return customToken;
    }

    // 커스텀 토큰에서 사용할 uid 가져오기
    private async getUid(email):Promise<any>{
        const uid = await admin.auth().getUserByEmail(email).then((user)=>{
            //일치하는 user 데이터가 있는 경우
            if(user){
                return user.uid;
            // 일치하는 user 데이터가 없는 경우    
            } else {
                console.log('해당 이메일 유저 정보 없음');
                return false
            }
        }).catch(function(err){
            console.log('해당 이메일 유저 정보 없음');
            console.log('CheckUser error: ', err);
            return false           
        })        
        return uid;
    }
}
