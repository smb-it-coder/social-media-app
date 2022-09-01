"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var session_controller_1 = require("./controller/session.controller");
var user_controller_1 = require("./controller/user.controller");
var requireUser_1 = __importDefault(require("./middleware/requireUser"));
var validateResource_1 = __importDefault(require("./middleware/validateResource"));
var session_schema_1 = require("./schema/session.schema");
var user_schema_1 = require("./schema/user.schema");
var bike_controller_1 = require("./controller/bike.controller");
function routes(app) {
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
    app.get("/healthcheck", function (req, res) { return res.sendStatus(200); });
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
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
    // bike data process api callings are
    /**
     * @openapi
     * '/api/v1/stations/add':
     *  get:
     *     tags:
     *     - Stations
     *     summary: Get a bike sharing data from indigo services
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Station'
     *       404:
     *         description: Station not found
     */
    app.get("/api/v1/stations/add", bike_controller_1.bikeHandler);
    /**
     * @openapi
     * '/api/v1/stations/?at=2022-06-04T11:29:13':
     *  get:
     *     tags:
     *     - Stations for specific time
     *     summary: Get a bike sharing data from database
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Station'
     *       404:
     *         description: Station not found
     */
    app.get("/api/v1/stations/", bike_controller_1.getBikeStationsAtHandler);
    // request geth  path :- {BASEURL}/api/v1/stations/30041?at=2022-06-04T11:29:13
    app.get("/api/v1/stations/:kioskId", bike_controller_1.getOneBikeStationsAtATimeHandler);
    // request geth  path :- {BASEURL}/api/v1/stations/30041?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00&frequency=daily
    // for example url for below routing http://localhost:1337/api/v1/station/3004?from=2022-06-05T00:00:00&to=2022-06-05T23:59:59&frequency=daily  , here BASEURL=http://localhost:1337
    app.get("/api/v1/station/:id", bike_controller_1.getOneBikeStationsTimeRangeHandler);
}
exports.default = routes;
