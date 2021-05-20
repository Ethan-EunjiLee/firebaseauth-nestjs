import { Controller, Get } from '@nestjs/common';

//fireabse-admin
import * as admin from 'firebase-admin';

@Controller('firebase-retry')
export class FirebaseRetryController {

    @Get('customToken')
    firebaseCustomToken(){

        // 임의 문자열을 이용해 커스텀 토큰 제작
        const uid = 'some-uid';
        
        admin
            .auth()
            .createCustomToken(uid)
            .then((customToken) => {
                // Send token back to client
                console.log('customToken: ', customToken);
            })
            .catch((err) => {
                console.log('Error creating custom token', err);
            });
    }
    

}
