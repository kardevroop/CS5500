import User from "../models/User";
import User2Following from "../models/User2Following";
import User2Followers from "../models/User2Followers";

export default interface FollowsDaoI {
   follow(uid: String, fuid: String): Promise<User>;
   unfollow(uid: string, fuid: string): Promise<any>;
   findFollowingList(uid: String): Promise<User[]>;
   findFollowedBy(uid: String): Promise<User[]>;
}
