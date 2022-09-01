import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler , verifyOtpHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createPOtpVerifySchema } from "./schema/potp-verify.schema";

// User Post 
import { createUserPostHandler , getUserPostHandler, viewPostHandler } from "./controller/user-post.controller";
import { createUserPostSchema } from "./schema/user-post.schema";
// end dependecny calling of user post 
// User friendship 
import { createUserFriendshipHandler , getUserFriendshipHandler, acceptRequestHandler } from "./controller/user-friendship.controller";
import { createUserFriendshipSchema } from "./schema/user-friendship.schema";
import { createAcceptRequestSchema } from "./schema/accept-request.schema";
// end dependency calling of user post 

// Post Share
import { createPostShareHandler , getPostShareHandler } from "./controller/post-share.controller";
import { createPostShareSchema } from "./schema/post-share.schema";
// end dependency calling of post share

// search user by name or email
import { getUserSearchHandler } from "./controller/user-search.controller";
// end here
// for bucket creation
import { createBucketHandler } from "./controller/pmineo-bucket.controller";


function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);




  /**
   * @openapi
   * '/api/verify-otp':
   *  post:
   *     tags:
   *     - Verify Otp
   *     summary: Verify user by using otp
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePOtpVerifyInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreatePOtpVerifyResponse'
   *      409:
   *        description: Conflict
   *      404:
   *        description: Otp not found
   *      410:
   *        description: Otp has been expired
   */
   app.post("/api/verify-otp", validateResource(createPOtpVerifySchema), verifyOtpHandler);



  /**
   * @openapi
   * '/api/post/create':
   *  post:
   *     tags:
   *     - User Post
   *     summary: Create a user post
   *     requestBody:
   *      description: User to add post into the system.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateUserPostInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserPostResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/post/create", validateResource(createUserPostSchema), createUserPostHandler);


/**
 * @openapi
 * '/api/post-list/:user_id':
 *  get:
 *     tags:
 *     - User Post
 *     summary: Get a user posts By user id 
 *     requestBody:
 *       required: true
 *     properties:
 *       user_id:
 *         type: string
 *         default: 630e4c45f971e6790335ef34
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/CreateUserPostInput'
 *       404:
 *         description: User Post items not found
 */

 app.get("/api/post-list/:user_id",  getUserPostHandler);


/**
 * @openapi
 * '/api/bucket/:flag':
 *  get:
 *     tags:
 *     - Bucket for media file over mineo
 *     summary: Create a bucket over mineo environment for storing image / video
 *     requestBody:
 *       required: true
 *     properties:
 *       flag:
 *         type: boolean
 *         default: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *       404:
 *         description: User Post items not found
 */

 app.get("/api/bucket/:flag",  createBucketHandler);


/**
 * @openapi
 * '/api/post/view/:id':
 *  get:
 *     tags:
 *     - User Post
 *     summary: Get a post detail by post id 
 *     requestBody:
 *       required: true
 *     properties:
 *       id:
 *         type: string
 *         default: 630f0676bea3cab8f68ca2db
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/CreateUserPostInput'
 *       404:
 *         description:  Post details not found
 */

 app.get("/api/post/view/:id",  viewPostHandler);





  /**
   * @openapi
   * '/api/user-friendship/create':
   *  post:
   *     tags:
   *     - User Friendship
   *     summary: add new user into friendship list
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserFriendshipInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserFriendshipResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
   app.post("/api/user-friendship/create", validateResource(createUserFriendshipSchema), createUserFriendshipHandler);



  /**
   * @openapi
   * '/api/friendship/accept':
   *  post:
   *     tags:
   *     - User Friendship
   *     summary: Accept friend request 
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateAcceptRequestInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateAcceptRequestResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
   app.post("/api/friendship/accept", validateResource(createAcceptRequestSchema), acceptRequestHandler);



/**
 * @openapi
 * '/api/friendship-list/:user_id':
 *  get:
 *     tags:
 *     - User Friendship
 *     summary: Get a user Friendship list By user id 
 *     requestBody:
 *       required: true
 *     properties:
 *       user_id:
 *         type: string
 *         default: 630e4c45f971e6790335ef34
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/CreateUserFriendshipInput'
 *       404:
 *         description: User Post items not found
 */

 app.get("/api/friendship-list/:user_id",  getUserFriendshipHandler);



  /**
   * @openapi
   * '/api/post-share/create':
   *  post:
   *     tags:
   *     - Post Share
   *     summary: Share a post with their friend circle.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePostShareInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreatePostShareResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
   app.post("/api/post-share/create", validateResource(createPostShareSchema), createPostShareHandler);



/**
 * @openapi
 * '/api/share-list/:post_id':
 *  get:
 *     tags:
 *     - Post Share
 *     summary: Get a shared list By post id 
 *     requestBody:
 *       required: true
 *     properties:
 *       post_id:
 *         type: string
 *         default: 630f060cbea3cab8f68ca2d9
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/CreatePostShareInput'
 *       404:
 *         description: User Post items not found
 */

 app.get("/api/share-list/:post_id",  getPostShareHandler);

/**
 * @openapi
 * '/api/search/:q':
 *  get:
 *     tags:
 *     - Search User
 *     summary: Get a user data searching name or email
 *     requestBody:
 *       required: true
 *     properties:
 *       q:
 *         type: string
 *         default: xyz@email.com or name
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/CreateUserInput'
 *       404:
 *         description: User not found
 */

 app.get("/api/search/:q",  getUserSearchHandler);




}

export default routes;
