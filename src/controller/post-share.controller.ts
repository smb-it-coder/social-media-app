import { Request, Response } from "express";
import dayjs from "dayjs";
import logger from "../utils/logger";

import { CreatePostShareInput } from "../schema/post-share.schema";


import {
  createPostShare,
  getPostShareList
} from "../service/post-share.service";



export async function createPostShareHandler(
  req: Request<{}, {}, CreatePostShareInput["body"]>,
  res: Response
) {
  try {
    const postShare = await createPostShare(req.body);
    return res.send(postShare);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


export async function getPostShareHandler(req: Request, res: Response) {
  try {
    const postId = req.params.post_id;
    const whereCondition:any = {
      "post_id":postId ,
    };

    console.log('whereCondition ==>', whereCondition  );
    const postShare = await getPostShareList(whereCondition);
    const result = {at : dayjs().toDate(), list: postShare};
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}








