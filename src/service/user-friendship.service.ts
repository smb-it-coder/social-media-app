import mongoose,  { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserFriendshipModel, {
  UserFriendshipDocument,
  UserFriendshipInputType,
} from "../models/user-friendship.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";



export async function createUserFriendship(input: UserFriendshipInputType) {
  const metricsLabels = {
    operation: "createUserFriendship",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    input.status = 0;  // 0 pending request to accept, 1 request was accepted, 2 - request blocked
    console.log('input ====', input);

    const result = await UserFriendshipModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function getUserFriendshipList(
  query: FilterQuery<UserFriendshipDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "getUserFriendshipList",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {

    let projection = {
      __v: false,
      _id: false
    };
    const result = await UserFriendshipModel.find(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}



export async function findAndUpdateUserFriendship(
  query: FilterQuery<UserFriendshipDocument>,
  update: UpdateQuery<UserFriendshipDocument>,
  options: QueryOptions
) {
  return UserFriendshipModel.findOneAndUpdate(query, update, options);
}

export async function deleteUserFriendship(query: FilterQuery<UserFriendshipDocument>) {
  return UserFriendshipModel.deleteOne(query);
}




export async function acceptFrendRequest(id: string) {

  const metricsLabels = {
    operation: "acceptFrendRequest",
  };

  const timer = databaseResponseTimeHistogram.startTimer();

  try {

    timer({ ...metricsLabels, success: "true" });
    const objectId = mongoose.Types.ObjectId(id);

    const filter__ = { _id: objectId , status: 0};
    const update__ = { status: 1 };
    const opts = { new: true };

    console.log('filter========', filter__);

    let isVerified = await UserFriendshipModel.findOneAndUpdate(filter__, update__, opts);

    console.log('isVerified========', isVerified.status);

    if (!isVerified) return false;

    if (isVerified.status == 1) {
      let res = [];
      res['message'] = 'Friend request has been accepted';
      res['accepted'] = isVerified.status;
      res['status'] = 200;
      return res;
    }

  }catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }


}
