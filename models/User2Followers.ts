import User from "./User";

/**
 * Intermediate class to hold relationship between a user and it's followers.
 */
export default class User2Followers {
   private profile: User;
   private followedBy: User;
}
