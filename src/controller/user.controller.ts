import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { CreatePOtpVerifyInput } from "../schema/potp-verify.schema";
import { createUser , verifyOtp } from "../service/user.service";

import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
  
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}



export async function verifyOtpHandler(
  req: Request<{}, {}, CreatePOtpVerifyInput["body"]>,
  res: Response
) {
  try {

    const otp = req.body.otp ;
    console.log('--=====otp====', otp);
   let verified =  await verifyOtp(otp);
   if (!verified) {
    return res.sendStatus(404);
   } else if(verified.status == 410) {
      return res.sendStatus(410);
   } else if(verified.status == 200) {
     return res.status(200).send(verified.message);
  } 
  
 return res.send(verified);
   

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
