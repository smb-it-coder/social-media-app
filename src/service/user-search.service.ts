import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
//import UserModel from "../models/user.model";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";




export async function getUserSearch(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "getUserSearch",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {

    let projection = {
      __v: false,
    };
    const result = await UserModel.find(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}
