import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserFriendshipInput:
 *      type: object
 *      required:
 *        - user
 *        - friend
 *        - status
 *      properties:
 *        user:
 *          type: string
 *        friend:
 *          type: string
 *        status:
 *          type: number
 *    CreateUserFriendshipResponse:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *        friend:
 *          type: string
 *        status:
 *          type: number
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserFriendshipSchema = object({
  body: object({
    user: string({
      required_error: "user is required",
    }),
    friend: string({
      required_error: "friend is required",
    }),
    status: number({
      required_error: "status is required",
    }),
  }),
});

export type CreateUserFriendshipInput = TypeOf<typeof createUserFriendshipSchema>;
