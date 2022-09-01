import { Request, Response } from "express";
import dayjs from "dayjs";
import logger from "../utils/logger";
import mongoose from "mongoose";

import { CreateUserPostInput } from "../schema/user-post.schema";

import {
  createUserPost,
  getUserPostList,
  getPostById
} from "../service/user-post.service";



export async function createUserPostHandler(
  req: Request<{}, {}, CreateUserPostInput["body"]>,
  res: Response
) {
  try {

    console.log('req.body', req.body);
    //return res.send(req.body);
    const userPost = await createUserPost(req.body);
    return res.send(userPost);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


export async function getUserPostHandler(req: Request, res: Response) {
  try {
    const userId = req.params.user_id;
    const whereCondition:any = {
      "user_id":userId ,
    };

    console.log('whereCondition ==>', whereCondition  );
    const UserPost = await getUserPostList(whereCondition);
    const result = {at : dayjs().toDate(), posts: UserPost};
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function viewPostHandler( req: Request, res: Response) {

  try {

      const id = req.params.id;
      if(!id) {
        return false;
      } 

      const objectId = mongoose.Types.ObjectId(id);


      const whereCondition:any = {
        "_id":objectId ,
      };

      console.log('======condition============> ', whereCondition);
      const post = await getPostById(whereCondition);
      console.log('======product============> ',post);

      if (!post) {
         return res.status(409).send('Post not found!');
      }

      const result = {at : dayjs().toDate(), post: post};
     
      return res.send(result);

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }

}








