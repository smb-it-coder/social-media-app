import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostShareInput:
 *      type: object
 *      required:
 *        - user_id
 *        - post_id
 *      properties:
 *        user_id:
 *          type: string
 *        post_id:
 *          type: string
 *    CreatePostShareResponse:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        post_id:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createPostShareSchema = object({
  body: object({
    user_id: string({
      required_error: "user_id is required",
    }),
    post_id: string({
      required_error: "post_id is required",
    }),
  }),
});

export type CreatePostShareInput = TypeOf<typeof createPostShareSchema>;
