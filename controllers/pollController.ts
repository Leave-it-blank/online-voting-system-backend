/** source/controllers/example.ts */
import { Request, Response, NextFunction } from 'express';
import client from '../libs/mongo_client';

//   await client.connect();
//   const dbName = "ovs";
//   const collectionName = "polls";

// Create references to the database and collection in order to run
// operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

/*
 *  *** INSERT DOCUMENTS ***
 *
 * You can insert individual documents using collection.insert().
 * In this example, we're going to create four documents and then
 * insert them all in one call with collection.insertMany().
 */
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);


const createPoll = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { title, options } = req.body;
    console.log(title, options);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";

    // Create references to the database and collection in order to run
    // operations on them.
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const id = Math.floor(Math.random() * 1000000000);
    console.log(req.body.user)
    try {
        const updateData = await collection.insertOne({
            pollId: id,
            pollTitle: title,
            pollOptions: options,
            active: true,
            createdAt: new Date(),
            pollCreator: req.body.user.username,
            createdBy: req.body.user.userId,
        });
        console.log(`${updateData.acknowledged} documents successfully inserted.\n`);
        return res.status(200).json({
            message: "Successfully Added poll.",
            status: "success",
            pollId: id
        });
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        return res.status(200).json({
            message: "unable to create.",
            status: "error",
        });
    }


};
const fetchPoll = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Fetching Polls`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";

    try {
        const polls = await client.db(dbName).collection(collectionName).find({}).toArray();
        console.log(polls);

        return res.status(200).json({
            polls
        });
    } catch (err) {
        console.log(err);
    }

};
const fetchPollById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Fetching Polls`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";
    const id = req.params.id;
    console.log(id);
    try {
        const poll = await client.db(dbName).collection(collectionName).findOne({ pollId: Number(id) });
        console.log(poll);
        return res.status(200).json({
            poll
        });

    } catch (err) {
        console.log(err);
    }
}
const castVoteById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`cast Vote Polls`);
    await client.connect();
    const id = req.params.id;
    const body = req.body;
    const dbName = "ovs";
    console.log(body);
    const collectionNamepollByid = "poll-" + req.params.id;
    const collectionNamePolls = "polls";

    try {
        const getPoll = await client.db(dbName).collection(collectionNamePolls).findOne({ pollId: Number(id) });
        console.log(getPoll);
        if (getPoll == null) {
            return res.status(404).json({
                message: "Poll not found",
                status: "error"
            });
        } else if (getPoll.active == false) {
            return res.status(403).json({
                message: "Poll is not active",
                status: "error"
            });
        }


        const query = { user_id: body.user_id, pollId: body.id };
        const poll = await client.db(dbName).collection(collectionNamepollByid).findOne(query);
        if (poll != null) {
            return res.status(203).json({
                message: "Already Voted",
                status: "error"
            });
        }

        const data = {
            userIp: String(body.user_ip),
            pollId: body.id,
            vote: body.vote,
            user_id: body.user_id,
            createdAt: new Date(),

        }
        console.log(data);
        const addVote = await client.db(dbName).collection(collectionNamepollByid).insertOne(data);

        return res.status(200).json({
            message: "Added your vote.",
            status: "success"
        });
    } catch (err) {
        console.log(err);
    }

}

const fetchVotesById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Fetching Votes`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "poll-" + req.params.id;
    const id = req.params.id;
    console.log(id);
    try {
        const votes = await client.db(dbName).collection(collectionName).find({}).toArray();
        console.log(votes);
        return res.status(200).json({
            votes: votes.length
        });
    }
    catch (err) {
        console.log(err)
    }
}
const fetchPollResultsById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Fetching Polls data by id result`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "poll-" + req.params.id;
    const collectionNamePolls = "polls";
    const id = req.params.id;
    console.log(id);
    try {
        const poll = await client.db(dbName).collection(collectionNamePolls).findOne({ pollId: Number(id) });
        const votes = await client.db(dbName).collection(collectionName).find({}).toArray();
        console.log(poll);

        const pollOptionCount : any= {};

        votes.forEach((item : any , index: number) => {
            if (item.vote) {
                const votedata = item.vote;
                console.log(votedata)
                pollOptionCount[votedata] =   pollOptionCount[votedata] ? pollOptionCount[votedata] + 1 : 1  
            }
        });
        if(poll){
            poll.pollOptions.forEach((option : string) => {
                if (!pollOptionCount.hasOwnProperty(option[0])) {
                  pollOptionCount[option[0]] = 0;
                }
              });
        }
      

        // Sort the poll options based on the count
        const sortedOptions = Object.entries(pollOptionCount).sort(
            (a: any, b: any) => b[1] - a[1]
        );
        let votesItem = {

        }
    
   

        return res.status(200).json({
            poll: poll,
            votes: sortedOptions,
            status: "success",
            message: "successfully fetched."
        });
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            message: err,
            status: "error"
        });


    }
}

const fetchActivePolls = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Fetching Active Polls`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";
    try {
        const polls = await client.db(dbName).collection(collectionName).find({ active: true }).toArray();
        console.log(polls);
        
        return res.status(200).json({
            polls
        });
    } catch (err) {
        console.log(err);
    }
}
const markPollInactive = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Marking  Poll inactive`);
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";
    const id = req.params.id;
    console.log(id);
    try {
        const poll = await client.db(dbName).collection(collectionName).findOne({ pollId: Number(id) });
        console.log(poll);
        if (poll == null) {
            return res.status(404).json({
                message: "Poll not found",
                status: "error"
            });
        }
        const query = { pollId: Number(id) };
        const update = { $set: { active: false } };
        const options = { upsert: true };
        const result = await client.db(dbName).collection(collectionName).updateOne(query, update, options);
        console.log(result);
        return res.status(200).json({
            message: "Poll marked inactive",
            status: "success"
        });
    } catch (err) {
        console.log(err);
    }
}



export default { createPoll, fetchPoll, fetchPollById, castVoteById, fetchVotesById, fetchPollResultsById, fetchActivePolls , markPollInactive };