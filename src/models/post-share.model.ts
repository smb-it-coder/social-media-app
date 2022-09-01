import mongoose from "mongoose";

export interface PostShareInputType {
  user_id: string;
  post_id: string;
}

export interface PostShareDocument extends PostShareInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}



const postShareSchema = new mongoose.Schema(
  { 
    user_id: {type: String, index: true},
    post_id: {type: String, index: true},
  }
);

const PostShareModel = mongoose.model<PostShareDocument>("post-share", postShareSchema);


export default PostShareModel;
