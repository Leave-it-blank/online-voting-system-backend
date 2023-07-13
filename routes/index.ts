import express from 'express';
import PollController from '../controllers/pollController';
const router = express.Router();
import {auth} from '../middleware/auth';

router.post('/create-poll' , auth, PollController.createPoll);
router.get('/polls', PollController.fetchPoll);
router.get('/poll/:id', PollController.fetchPollById);
router.post('/poll/:id/vote', auth, PollController.castVoteById);
router.get('/poll/:id/results', PollController.fetchVotesById);
router.get('/poll/:id/final_results', auth, PollController.fetchPollResultsById);
router.get('/active-polls', PollController.fetchActivePolls);
router.get('/poll/:id/mark-inactive', auth, PollController.markPollInactive);
//@ts-ignore
export = router;