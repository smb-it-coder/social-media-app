import mongoose from "mongoose";

export interface UserPostInputType {
  title: string;
  description: string;
  post_type: string;
  file:string;
  user_id: string;
  state: number;
  status: number;
}

export interface UserPostDocument extends UserPostInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}



const userPostSchema = new mongoose.Schema(
  { 
    title: {type: String},
    description: {type: String},
    post_type: {
      type: String,  
      enum : ['IMAGE','VIDEO'],
      default: 'IMAGE'
    },
    file: {type: String},
    user_id: {type: String},
    state: {type: Number},
    status: {type: Number},
  }
);

const UserPostModel = mongoose.model<UserPostDocument>("user-post", userPostSchema);


export default UserPostModel;
