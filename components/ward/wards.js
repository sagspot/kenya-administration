import express from 'express';
import {
  getWards,
  getWard,
  getConstituencyWard,
  getCountyWard,
  postWard,
  patchWard,
} from './wardController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Ward:
 *      type: object
 *      required:
 *        - name
 *        - constituency
 *        - county
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the ward
 *        name:
 *          type: string
 *          description: The name of the ward
 *        constituency:
 *          type: string
 *          description: ID of constituency the ward is located
 *        county:
 *          type: string
 *          description: ID of county the ward is located
 *      example:
 *        _id: 60f1d8cf6ee9a02804f727a2
 *        name: kiganjo
 *        constituency: 60f0b9fcca855b1b38aa27a2
 *        county: 60f06bf2a26f650268a1f811
 */

/**
 * @swagger
 * tags:
 *  name: Wards
 *  description: Get, post & update wards from these routes. Does not require authentication to get. To post & update a ward however, you have to be authenticated
 */

router.get('/', getWards);
/**
 * @swagger
 * /api/v1/ward:
 *  get:
 *    summary: Fetch all wards
 *    description: Return list of all wards and their respective constituencies & counties
 *    tags: [Wards]
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ward'
 *      500:
 *        description: Something went wrong
 */

router.get('/:wardid', getWard);
/**
 * @swagger
 * /api/v1/ward/{wardid}:
 *  get:
 *    summary: Fetch ward details
 *    description: Return details of a single ward and its respective constituencies & county
 *    tags: [Wards]
 *    parameters:
 *      - in: path
 *        name: wardid
 *        schema:
 *          type: string
 *          required: true
 *          description: The ward id
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
 *                    example: 60f1d8cf6ee9a02804f727a2
 *                  name:
 *                    type: string
 *                    example: kiganjo
 *                  constituency:
 *                    $ref: '#/components/schemas/Constituency'
 *                  county:
 *                    $ref: '#/components/schemas/County'
 *      400:
 *        description: Bad request. Invalid ward ID
 *      404:
 *        description: Ward not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.get('/constituency/:constituencyid', getConstituencyWard);
/**
 * @swagger
 * /api/v1/ward/constituency/{constituencyid}:
 *  get:
 *    summary: Fetch all wards from a selected constituency
 *    description: Return all wards from a selected constituency and its respective county
 *    tags: [Wards]
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
 *                $ref: '#/components/schemas/Ward'
 *      400:
 *        description: Bad request. Invalid constituency ID
 *      404:
 *        description: Ward not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.get('/county/:countyid', getCountyWard);
/**
 * @swagger
 * /api/v1/ward/county/{countyid}:
 *  get:
 *    summary: Fetch all wards from a selected county
 *    description: Return all wards from a selected county and their respective constituencies
 *    tags: [Wards]
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
 *                $ref: '#/components/schemas/Ward'
 *      400:
 *        description: Bad request. Invalid county ID
 *      404:
 *        description: Ward not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.post('/', postWard);
/**
 * @swagger
 * /api/v1/ward:
 *  post:
 *    summary: Add new ward
 *    description: Add new ward. Requires authentication and admin role
 *    tags: [Wards]
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
 *                example: Kiamaiko
 *              constituency:
 *                type: string
 *                example: 60f0c3c974a8da3390672bb3
 *    responses:
 *      201:
 *        description: Created. Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ward'
 *      400:
 *        description: Bad request. Invalid constituency ID
 *      404:
 *        description: Constituency not found
 *      409:
 *        description: Conflict. Ward exists
 *      500:
 *        description: Something went wrong
 */

router.patch('/:wardid', patchWard);
/**
 * @swagger
 * /api/v1/ward/{wardid}:
 *  patch:
 *    summary: Update ward
 *    description: Update ward. Requires authentication and admin role
 *    tags: [Wards]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: wardid
 *        schema:
 *          type: string
 *          required: true
 *          description: Ward id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Kiamaiko
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ward'
 *      400:
 *        description: Bad request. Invalid ward ID
 *      404:
 *        description: Ward not found/ Ward name is required
 *      500:
 *        description: Something went wrong
 */

export default router;
