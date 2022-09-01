import mongoose, { FilterQuery } from "mongoose";
import { omit } from "lodash";
import dayjs from "dayjs";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { createPOtp , findPOtp } from "../service/potp.service";
import { sendPOtpUsingEmail } from "../service/psendotp-email.service";

import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createUser(input: UserInput) {
  try {

    input.verified = false;
    console.log('input ====', input);
    const user = await UserModel.create(input);

    /**
     *  Otp created into collection &
     *  triggered email to registered email address
     *  Storing otp into otp collection
     * 
     **/

    let otp = Math.floor(1000 + Math.random() * 9000);
    let otpInputObject = {
      at: dayjs().toDate(),
      user_id: user._id,
      otp: otp
    };

    let isCreatedOtp = await createPOtp(otpInputObject);


    if (isCreatedOtp.otp == otp) {
      let emailsentObject = {
        to: user.email,
        subject: 'Email OTP login Verification',
        otp: otp,
      };

      await sendPOtpUsingEmail(emailsentObject);

    }

    /***
     *  End otp send by email 
     * 
     **/



    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}



export async function verifyOtp(otp: number) {
 
  const metricsLabels = {
    operation: "isOtpVerify",
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {

   

    const result = await findPOtp({ otp: otp });
    
    timer({ ...metricsLabels, success: "true" });

    if (!result) return false;

   console.log('otp details ', result  );

   if(result.otp != null && result.otp == otp ) {

    let startTime = new Date(result.at); 
    let endTime = new Date(dayjs().toDate());
    let difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    let resultInMinutes = Math.round(difference / 60000);


    console.log('resultInMinutes=======', resultInMinutes);

    // OTP should not be more than 10 minutes
    if(resultInMinutes > 10) { 
      let data = [];
      data['message'] = null;
      data['verified'] = false;
      data['status'] = 410;
      return data;
    } else {

     //let userId =  ;
     const objectId = mongoose.Types.ObjectId(result.user_id);

      const filter__ = { _id: objectId };
      const update__ = { verified: true };
      const opts = { new: true };

      console.log('filter========', filter__);

      let isVerified = await UserModel.findOneAndUpdate(filter__, update__, opts);

      console.log('isVerified========', isVerified.verified);

      if(!isVerified) return false;

      if (isVerified.verified == true) {
        let res = [];
        res['message'] = 'Otp has been verified';
        res['verified'] = isVerified.verified;
        res['status'] = 200;
        return res;
      }
      
    }

   }


    

  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}