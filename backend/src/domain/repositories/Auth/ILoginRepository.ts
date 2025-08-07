import { UserLoginEntity } from '../../entities/Auth/UserLoginEntity'
import UserProfileTokenEntity from '../../entities/Auth/UserProfileTokenEntity'

export default interface ILoginRepository {
  validateUser(userProfile: UserLoginEntity): Promise<boolean>;
  getUserProfile(userProfile: UserLoginEntity): Promise<UserProfileTokenEntity>;
}
