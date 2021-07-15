import express from 'express';
import {
  getConstituencies,
  getCountyConstituencies,
  getConstituency,
  postConstituency,
} from './constituencyController.js';

const router = express.Router();

router.get('/', getConstituencies);
router.get('/:countyid', getCountyConstituencies);
router.get('/:id', getConstituency);
router.post('/', postConstituency);

export default router;
