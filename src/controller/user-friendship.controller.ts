import { Request, Response } from "express";
import dayjs from "dayjs";
import logger from "../utils/logger";

import { CreateUserFriendshipInput } from "../schema/user-friendship.schema";


import {
  createUserFriendship,
  getUserFriendshipList,
  acceptFrendRequest
} from "../service/user-friendship.service";



export async function createUserFriendshipHandler(
  req: Request<{}, {}, CreateUserFriendshipInput["body"]>,
  res: Response
) {
  try {
    const userFriendship = await createUserFriendship(req.body);
    return res.send(userFriendship);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


export async function getUserFriendshipHandler(req: Request, res: Response) {
  try {
    const userId = req.params.user_id;
    const whereCondition:any = {
      "user":userId ,
    };

    console.log('whereCondition ==>', whereCondition  );
    const userFriendship = await getUserFriendshipList(whereCondition);
    const result = {at : dayjs().toDate(), list: userFriendship};
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


export async function acceptRequestHandler(
  req: Request<{}, {}, CreateUserFriendshipInput["body"]>,
  res: Response
) {
  try {

    const id = req.body.id ;
    console.log('--=====id====', id);
   let acceptedRequest =  await acceptFrendRequest(id);
   if (!acceptedRequest) {
    return res.sendStatus(404);
   } else if(acceptedRequest.status == 410) {
      return res.sendStatus(410);
   } else if(acceptedRequest.status == 200) {
     return res.status(200).send(acceptedRequest.message);
  } 
  
 return res.send(acceptedRequest);
   

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}








