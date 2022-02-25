import User from "./User";

/**
 * Class to represent an Message.
 */
export default class Message {
   private message: string = '';
   private to: User ;
   private from: User;
   private senntOn: Date = new Date();
}
