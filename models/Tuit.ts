import User from "./User";

/**
 * @class Class to represent a tuit.
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
}
