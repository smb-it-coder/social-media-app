## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* JWT & refresh tokens
* Request validation
## Technologies
* Node.js
* Mongoose
* TypeScript
* Express.js 
* Zod validation
* Swagger documentation 

## Video structure
1. What are we going to build (Swagger documentation demo - Philadelphia bike-sharing)
2. Code walk-through
3. Bootstrap application
   1. Setup express JS
   2. Create routes function
   3. Setup database connection
   4. Setup logger
   5. Validate request middleware

## How to run application on your local machine
* move to project directory using cd command 
* Update database connection URL for mongo inside file config->default.ts
* RUN docker-compose up -d --build
* RUN  yarn build
* RUN  yarn dev

Note: You will need Docker installed locally if you want to test your Docker configutation




// Collection details

   Collection name :- social-media-app.otps
      - user_id : string
      - otp : number

Collection name :- social-media-app.post-shares
      - user_id : UUID
      - post_id : UUID

Collection name :- social-media-app.user-friendships
      - user : UUID
      - friend : UUID
Collection name :- social-media-app.user-posts
      - title : string
      - description : string
      - post_type : ENUM(string)
      - user_id : UUID
      - state : number
      - status : number






