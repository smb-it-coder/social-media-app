import nodemailer from "nodemailer";
import config from "config";

import { databaseResponseTimeHistogram } from "../utils/metrics";
import { POtpUsingEmailInputType } from "../models/potp.model";



export async function sendPOtpUsingEmail(input: POtpUsingEmailInputType) {
  

  try {
    const timer = databaseResponseTimeHistogram.startTimer();

    const hostname = config.get<string>("smtpHostname");
    const username = config.get<string>("smtpUsername");
    const password = config.get<string>("smtpPassword");
  
    const email = input.to ;
    const subject = input.subject ;
    const otp = input.otp ;

    const metricsLabels = {
      operation: "sendOtpUsingEmail",
    };
  
    const timer = databaseResponseTimeHistogram.startTimer();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: hostname,
        port: 465,
        secure: false,
        auth: {
          user: username,
          pass: password,
        },
        tls:{
          rejectUnauthorized:false
       }
      });


      let mailOptions = {
        from: 'Assignment..!',
        to: email,
        subject: subject , //'Email OTP login Verification',
        html: `<h1>Welcome ${email}</h1>
        <p>Here is a OTP : <h3>${otp}</h3> to complete the login Process.</p><br>`
    };



      const result = await transporter.sendMail(mailOptions);
      timer({ ...metricsLabels, success: "true" });
      console.log('result of function sendOtpUsingEmail ', result.response);
    
    return result.response;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

