import mongoose from "mongoose";
import { string } from "zod";

export interface POtpInputType {
  at: Date,
  user_id: string,
  otp: number,
}



export interface POtpUsingEmailInputType {
  to: string,
  subject: string,
  otp: number,
}


export interface POtpDocument extends POtpInputType, mongoose.Document {
  createdAt: Date;
}



const pOtpSchema = new mongoose.Schema(
  { at: {type: Date},
    user_id: {type: String},
    otp:  {type: Number},
  }
);

const POtpModel = mongoose.model<POtpInputType>("otp", pOtpSchema);


export default POtpModel;
