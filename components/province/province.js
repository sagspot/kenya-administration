import express from 'express';
import { getProvinces, postProvince } from './provinceController.js';
const router = express.Router();

router.get('/', getProvinces);
router.post('/', postProvince);

export default router;
