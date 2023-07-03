import express from 'express';
import PollController from '../controllers/pollController';
const router = express.Router();
 

router.post('/create-poll', PollController.createPoll);
router.get('/polls', PollController.fetchPoll);
router.get('/poll/:id', PollController.fetchPollById);

router.post('/poll/:id/vote', PollController.castVoteById);

// router.get('/test1',  PollController.test1);
// router.get('/test2', auth, PollController.test2);
// router.get('/fail1', auth, PollController.fail1);
// router.get('/fail2', auth, PollController.fail2);
//@ts-ignore
export = router;