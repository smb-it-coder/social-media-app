import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePOtpInput:
 *      type: object
 *      required:
 *        - user_id
 *        - otp
 *      properties:
 *        user_id:
 *          type: string
 *    CreatePOtpResponse:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        otp:
 *          type: number
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 */

export const createPOtpSchema = object({
  body: object({
    user_id: string({
      required_error: "user_id is required",
    }),
    otp: number({
      required_error: "otp is required",
    }),
  }),
});

export type CreatePOtpInput = TypeOf<typeof createPOtpSchema>;
