import { FirebaseUserInfoDto } from "src/dto/FirebaseUserInfo.Dto";

export interface FirebaseRetryServiceInterface {
    // 회원가입: 회원 여부 확인 > firebase User 추가
    signup(userInfo: FirebaseUserInfoDto): void

    // 회원 여부 확인은 구현 클래스에서 private으로 구현

    // 커스텀 토큰 부여
    giveToken(email:string): Promise<any>

    // giveToken()에서 사용할 createToekn(), getUid는 private으로 구현

}