import { Module } from '@nestjs/common';
import { FirebaseRetryController } from './firebase-retry.controller';
import { FirebaseRetryService } from './firebase-retry.service';

@Module({
    imports: [],
    controllers: [FirebaseRetryController],
    providers: [FirebaseRetryService],
    exports: []

})
export class FirebaseRetryModule {}
