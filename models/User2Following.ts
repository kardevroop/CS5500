import User from "./User";

/**
 * Intermediate class to hold relationship between a user 
 * and the users being followed by it.
 */
export default class User2Followers {
   private profile: User;
   private following: User;
}
