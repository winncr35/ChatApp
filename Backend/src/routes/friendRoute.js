import express from 'express'

import {
    sentFriendRequest,
    declineFriendRequest,
    acceptFriendRequest,
    getAllFriends,
    getFriendRequests
} from '../controllers/friendController.js';



const router = express.Router();

router.post('/requests', sentFriendRequest);

router.post('/requests/:requestId/accept', acceptFriendRequest);

router.post('/requests/:requestId/decline', declineFriendRequest);

router.get('/', getAllFriends);

router.get('/requests', getFriendRequests);

export default router;