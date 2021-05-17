import { Injectable, NestMiddleware } from "@nestjs/common";
import * as serviceAccount from "../firebase/firebaseServiceAccount.json"
import * as firebase from 'firebase-admin';
import { verify } from "crypto";

// JSON파일과 firebase.initializeApp 내부의 cert() 함수에서 파라미터로 사용되는 ServiceAccount의 key값이 다르기 때문에
// 다음과 같이 _소문자 => 대문자 로 변경 필요
const firebase_params = {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKkey: serviceAccount.private_key,
    type: serviceAccount.type,
    privateKeyId: serviceAccount.private_key_id,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientX509CertUrl: serviceAccount.client_x509_cert_url
}

@Injectable()
export class firebaseMiddleware implements NestMiddleware{

    private defaultApp: any;

    constructor(){
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
            databaseURL: 'https://fir-auth-bea2a-default-rtdb.firebaseio.com/'
        })
    }

    use(req: Request, res: Response, next: Function){
        console.log('firebaseMiddleware use()');

        // 실질적으로 Firebase를 활용 => request에서 bearer token읽고 firebase-admin을 이용해 토큰 확인
        //const token = req.headers.authorization;

        // if(token != null && token !+ ''){
        //     this.defaultApp.auth().verifyIdToken(token.replace('Bearer', ''))
        //     .then(async docodedToken => {
        //         const user = {
        //             email: docodedToken.email
        //         }

        //     })
        // }

        next(); // 통제권을 다음 미들웨어에게 넘기는 함수
    }
}

