import express from 'express';
import { getProvinces, postProvince } from './provinceController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Province:
 *      type: object
 *      required:
 *        - name
 *        - headquaters
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the province
 *        name:
 *          type: string
 *          description: The name of the province
 *        headquaters:
 *          type: string
 *          description: The headquater of the province
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        name: coast
 *        headquaters: mombasa
 */

/**
 * @swagger
 * tags:
 *  name: Province
 *  description: Get provinces from this route. Does not require authentication to get.
 */

router.get('/', getProvinces);
/**
 * @swagger
 * /api/v1/province:
 *  get:
 *    summary: Fetch all provinces
 *    description: Return list of all provinces and their respective headquaters
 *    tags: [Province]
 *    responses:
 *      200:
 *        description: The list of all provinces
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Province'
 *      500:
 *        description: Something went wrong
 */

router.post('/', postProvince);

export default router;
