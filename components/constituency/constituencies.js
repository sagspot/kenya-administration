import express from 'express';
import {
  getConstituencies,
  getCountyConstituencies,
  getConstituency,
  postConstituency,
} from './constituencyController.js';

const router = express.Router();

router.get('/', getConstituencies);
router.get('/:name', getConstituency);
router.get('/county/:countyid', getCountyConstituencies);
router.post('/', postConstituency);

export default router;
