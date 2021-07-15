import express from 'express';
import {
  getCounties,
  getProvinceCounties,
  getCounty,
  postCounty,
} from './countyController.js';
const router = express.Router();

router.get('/', getCounties);
router.get('/:provinceid', getProvinceCounties);
router.get('/:name', getCounty);
router.post('/', postCounty);

export default router;
