import mongoose from "mongoose";

export interface UserFriendshipInputType {
  user: string;
  friend: string;
  status: number;
}

export interface UserFriendshipDocument extends UserFriendshipInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}



const userFriendshipSchema = new mongoose.Schema(
  { 
    user: {type: String, index: true},
    friend: {type: String, index: true},
    status: {type: Number},
  }
);

const UserFriendshipModel = mongoose.model<UserFriendshipDocument>("user-friendship", userFriendshipSchema);


export default UserFriendshipModel;
