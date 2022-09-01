import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePOtpVerifyInput:
 *      type: object
 *      required:
 *        - otp
 *      properties:
 *        otp:
 *          type: number
 *    CreatePOtpVerifyResponse:
 *      type: object
 *      properties:
 *        otp:
 *          type: string
 *        _id:
 *          type: string
 *        at:
 *          type: string
 */

export const createPOtpVerifySchema = object({
  body: object({
    otp: number({
      required_error: "otp is required",
    }),
  }),
});

export type CreatePOtpVerifyInput = TypeOf<typeof createPOtpVerifySchema>;
