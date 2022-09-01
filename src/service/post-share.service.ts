import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PostShareModel, {
  PostShareDocument,
  PostShareInputType,
} from "../models/post-share.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";



export async function createPostShare(input: PostShareInputType) {
  const metricsLabels = {
    operation: "createPostShare",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PostShareModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function getPostShareList(
  query: FilterQuery<PostShareDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "getPostShareList",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {

    let projection = { 
      __v: false,
      _id: false
  };
    const result = await PostShareModel.find(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}



export async function findAndUpdatePostShare(
  query: FilterQuery<PostShareDocument>,
  update: UpdateQuery<PostShareDocument>,
  options: QueryOptions
) {
  return PostShareModel.findOneAndUpdate(query, update, options);
}

export async function deletePostShare(query: FilterQuery<PostShareDocument>) {
  return PostShareModel.deleteOne(query);
}

