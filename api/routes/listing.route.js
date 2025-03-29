import expresss from 'express';
import { createListing, deletelisting } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expresss.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken , deletelisting);

export default router;