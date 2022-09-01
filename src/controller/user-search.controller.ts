import { Request, Response } from "express";
import dayjs from "dayjs";
import logger from "../utils/logger";

import { getUserSearch } from "../service/user-search.service";




export async function getUserSearchHandler(req: Request, res: Response) {
  try {
    const searchInput = req.params.q;

   let nameCondition = {$regex: searchInput, $options: 'i'};
   let emailCondition = {$regex: searchInput, $options: 'i'};


    const whereCondition: any = {
      "$or": [{
        "name": nameCondition
      }, {
        "email": emailCondition,
      }]
    };


   

    console.log('whereCondition ==>', whereCondition  );
    const UserSearch = await getUserSearch(whereCondition);
    const result = {at : dayjs().toDate(), users: UserSearch};
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


