import express from 'express';
import {
  getCounties,
  getProvinceCounties,
  getCounty,
  postCounty,
} from './countyController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    County:
 *      type: object
 *      required:
 *        - name
 *        - headquaters
 *        - countycode
 *        - province
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the county
 *        name:
 *          type: string
 *          description: The name of the county
 *        headquaters:
 *          type: string
 *          description: Capital of the county
 *        countycode:
 *          type: number
 *          description: County code
 *        province:
 *          type: string
 *          description: Province ID
 *      example:
 *        _id: 60f05826a26f650268a1f7c2
 *        name: mombasa
 *        headquaters: mombasa
 *        countycode: 1
 *        province: 60f0453e628e042e8cf59af3
 */

/**
 * @swagger
 * tags:
 *  name: Counties
 *  description: Get counties from these routes. Does not require authentication.
 */

router.get('/', getCounties);
/**
 * @swagger
 * /api/v1/county:
 *  get:
 *    summary: Fetch all counties
 *    description: Return list of all counties and their respective provinces
 *    tags: [Counties]
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/County'
 *      500:
 *        description: Something went wrong
 */

router.get('/:countyid', getCounty);
/**
 * @swagger
 * /api/v1/county/{countyid}:
 *  get:
 *    summary: Fetch county details
 *    description: Return details of a single county and its respective province
 *    tags: [Counties]
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
 *        description: County not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.get('/province/:provinceid', getProvinceCounties);
/**
 * @swagger
 * /api/v1/county/province/{provinceid}:
 *  get:
 *    summary: Fetch all counties from a selected province
 *    description: Return all counties from a selected county
 *    tags: [Counties]
 *    parameters:
 *      - in: path
 *        name: provinceid
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/County'
 *      400:
 *        description: Bad request. Invalid province ID
 *      404:
 *        description: County not found. Check your url parameter and try again
 *      500:
 *        description: Something went wrong
 */

router.post('/', postCounty);

export default router;
