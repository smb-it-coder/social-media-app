import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";


import POtpModel, {
  POtpDocument,
  POtpInputType,
} from "../models/potp.model";

import { databaseResponseTimeHistogram } from "../utils/metrics";



export async function createPOtp(input: POtpInputType) {
  const metricsLabels = {
    operation: "createPOtp",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    
    const result = await POtpModel.create(input);
  
    console.log('result of function createPOtp ', result);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findPOtp(
  query: FilterQuery<POtpDocument>,
  options: QueryOptions = { lean: true }
) {
  
  try {
    
    const metricsLabels = {
      operation: "findPOtp",
    };
  
    const timer = databaseResponseTimeHistogram.startTimer();
   
    let projection = { 
      __v: false,
      _id: false
  };
    const result = await POtpModel.findOne(query, projection, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}


export async function deletePOtp(query: FilterQuery<POtpDocument>) {
  return POtpModel.deleteOne(query);
}

