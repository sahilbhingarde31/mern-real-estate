import expresss from 'express';
import { createListing, deletelisting, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expresss.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken , deletelisting);
router.post('/update/:id', verifyToken, updateListing);

export default router;