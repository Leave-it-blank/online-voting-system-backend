/** source/controllers/example.ts */
import { Request, Response, NextFunction } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
 
const uri = process.env.MONGO_DB || ``;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
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
    await client.connect();
    const dbName = "ovs";
    const collectionName = "polls";

    // Create references to the database and collection in order to run
    // operations on them.
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const id = Math.floor(Math.random() * 1000000000);
    try {
        const updateData = await collection.insertOne({
            pollId: id,
            pollTitle: title,
            pollOptions: options,
        });
        console.log(`${updateData.acknowledged} documents successfully inserted.\n`);
      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }

    return res.status(200).json({
        data: "Successfully Added poll.",
        pollId: id
    });
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
    }catch(err){
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
            const poll = await client.db(dbName).collection(collectionName).findOne({pollId: Number(id)});
            console.log(poll);
            return res.status(200).json({
                poll
            });
            
    }catch(err){
        console.log(err);
    }
}
const castVoteById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`cast Vote Polls`);
    await client.connect();
    const id = req.params.id;
    const body = req.body;
    const dbName = "ovs";
    
    const collectionName2 = "poll-" + req.params.id;
 
    try {
            const poll = await client.db(dbName).collection(collectionName2).findOne({user: Number(body.user)});
            if(poll != null ){
                return res.status(200).json({
                    data: "Already Voted"
                });
            }
            const addVote = await client.db(dbName).collection(collectionName2).insertOne({
                userIp: Number(body.user),
                pollId: body.id,
                vote: body.vote,
            });

            return res.status(200).json({
                data: addVote.acknowledged
            });
        }catch(err){
            console.log(err);
        }
    }
export default {   createPoll, fetchPoll , fetchPollById , castVoteById};