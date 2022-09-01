import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserPostInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - post_type
 *        - file
 *        - user_id
 *        - state
 *        - status
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        post_type:
 *          type: string
 *          default: IMAGE
 *        file:
 *          type: string
 *          format: binary
 *        user_id:
 *          type: string
 *        state:
 *          type: number
 *        status:
 *          type: number
 *    CreateUserPostResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        post_type:
 *          type: string
 *        file:
 *          type: string
 *          format: binary
 *        user_id:
 *          type: string
 *        state:
 *          type: number
 *        status:
 *          type: number
 *        _id:
 *          type: string
 */

export const createUserPostSchema = object({
  body: object({
    title: string({
      required_error: "title is required",
    }),
    description: string({
      required_error: "description is required",
    }),
    post_type: string({
      required_error: "Post Type is required",
    }),
    file: string({
      required_error: "file is required",
    }),
    user_id: string({
      required_error: "user_id is required",
    }),
    state: number({
      required_error: "state is required",
    }),
    status: number({
      required_error: "status is required",
    }),
  }),
});

export type CreateUserPostInput = TypeOf<typeof createUserPostSchema>;
