import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserPostModel, {
  UserPostDocument,
  UserPostInputType,
} from "../models/user-post.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";



export async function createUserPost(input: UserPostInputType) {
  const metricsLabels = {
    operation: "createUserPost",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await UserPostModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    console.log('user Post input', input);
   // return input;
   return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function getUserPostList(
  query: FilterQuery<UserPostDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "getUserPostList",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {

    let projection = {
      __v: false,
    };
    const result = await UserPostModel.find(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function getPostById(
  query: FilterQuery<UserPostDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "getPostById",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {

    // let projection = { 
    //     "_id" : 1,
    //     "name": 1,
    //     "title": 1,
    //     "description": 1,
    //     "post_type": 1,
    //     "user_id": 1,
    //     "state" : 1,
    //     "status" : 1,
    //     "createdAt": 1,
    //     "updatedAt": 1,
    // };

    let projection = {
      __v: false,
    };

    const result = await UserPostModel.findOne(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}


export async function findAndUpdateUserPost(
  query: FilterQuery<UserPostDocument>,
  update: UpdateQuery<UserPostDocument>,
  options: QueryOptions
) {
  return UserPostModel.findOneAndUpdate(query, update, options);
}

export async function deleteUserPost(query: FilterQuery<UserPostDocument>) {
  return UserPostModel.deleteOne(query);
}

