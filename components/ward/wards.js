import express from 'express';
import {
  getWards,
  getWard,
  getConstituencyWard,
  postWard,
} from './wardController.js';
const router = express.Router();

router.get('/', getWards);
router.get('/:name', getWard);
router.get('/constituency/:constituencyid', getConstituencyWard);
router.post('/', postWard);

export default router;
