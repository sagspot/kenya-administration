import express from 'express';
import {
  getCounties,
  getProvinceCounties,
  getCounty,
  postCounty,
} from './countyController.js';
const router = express.Router();

router.get('/', getCounties);
router.get('/:name', getCounty);
router.get('/province/:provinceid', getProvinceCounties);
router.post('/', postCounty);

export default router;
