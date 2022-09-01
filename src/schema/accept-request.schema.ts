import { string, object, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAcceptRequestInput:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: string
 *    CreateAcceptRequestResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        at:
 *          type: string
 */

export const createAcceptRequestSchema = object({
  body: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export type CreateAcceptRequestInput = TypeOf<typeof createAcceptRequestSchema>;
