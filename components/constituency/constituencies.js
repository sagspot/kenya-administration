import express from 'express';
import {
  getConstituencies,
  getCountyConstituencies,
  getConstituency,
  postConstituency,
  patchConstituency,
} from './constituencyController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Constituency:
 *      type: object
 *      required:
 *        - name
 *        - county
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the constituency
 *        name:
 *          type: string
 *          description: The name of the constituency
 *        county:
 *          type: string
 *          description: ID of county the constituency is located
 *      example:
 *        _id: 60f0af5a9d08c91e109695d2
 *        name: changamwe
 *        county: 60f05826a26f650268a1f7c2
 */

/**
 * @swagger
 * tags:
 *  name: Constituencies
 *  description: Get, post & update constituencies from these routes. Does not require authentication to get. To post & update a constituency however, you have to be authenticated
 */

router.get('/', getConstituencies);
/**
 * @swagger
 * /api/v1/constituency:
 *  get:
 *    summary: Fetch all constituencies
 *    description: Return list of all constituencies and their respective counties
 *    tags: [Constituencies]
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Constituency'
 *      500:
 *        description: Something went wrong
 */

router.get('/:constituencyid', getConstituency);
/**
 * @swagger
 * /api/v1/constituency/{constituencyid}:
 *  get:
 *    summary: Fetch constituency details
 *    description: Return details of a single constituency and its respective county
 *    tags: [Constituencies]
 *    parameters:
 *      - in: path
 *        name: constituencyid
 *        schema:
 *          type: string
 *          required: true
 *          description: The constituency id
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: 60f0af5a9d08c91e109695d2
 *                  name:
 *                    type: string
 *                    example: changamwe
 *                  county:
 *                    $ref: '#/components/schemas/County'
 *      400:
 *        description: Bad request. Invalid constituency ID
 *      404:
 *        description: Constituency not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.get('/county/:countyid', getCountyConstituencies);
/**
 * @swagger
 * /api/v1/constituency/county/{countyid}:
 *  get:
 *    summary: Fetch all constituencies from a selected county
 *    description: Return all constituencies from a selected county
 *    tags: [Constituencies]
 *    parameters:
 *      - in: path
 *        name: countyid
 *        schema:
 *          type: string
 *          required: true
 *          description: The county id
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Constituency'
 *      400:
 *        description: Bad request. Invalid county ID
 *      404:
 *        description: Constituency not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.post('/', postConstituency);
/**
 * @swagger
 * /api/v1/constituency:
 *  post:
 *    summary: Add new constituency
 *    description: Add new constituency. Requires authentication and admin role
 *    tags: [Constituencies]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Mathare
 *              county:
 *                type: string
 *                example: 60f06e7ba26f650268a1f86d
 *    responses:
 *      201:
 *        description: Created. Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Constituency'
 *      400:
 *        description: Bad request. Invalid county ID
 *      404:
 *        description: County not found
 *      409:
 *        description: Conflict. Constituency exists
 *      500:
 *        description: Something went wrong
 */

router.patch('/:constituencyid', patchConstituency);
/**
 * @swagger
 * /api/v1/constituencyid/{constituencyid}:
 *  patch:
 *    summary: Update constituency
 *    description: Update constituency. Requires authentication and admin role
 *    tags: [Constituencies]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: constituencyid
 *        schema:
 *          type: string
 *          required: true
 *          description: Constituency id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Mathare
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Constituency'
 *      400:
 *        description: Bad request. Invalid constituency ID
 *      404:
 *        description: Constituency not found/ Constituency name is required
 *      500:
 *        description: Something went wrong
 */

export default router;
