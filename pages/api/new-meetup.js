// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // CONNECTING TO THE DATABASE.
    const client = await MongoClient.connect(
      "mongodb+srv://x_hrsht_x:hrsht-x007@cluster0.yos87.mongodb.net/nextjs-app-meetups?retryWrites=true&w=majority"
    );
    // GETTING ACCESS TO THE DATABASE.
    const db = client.db();

    // GETTING ACCESS TO THE COLLECTION(TABLE.)
    const meetupsCollection = db.collection("meetups");

    // INSERTING A DOCUMENT(JS OBJECT)
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // CLOSING THE CONNECTION WITH THE DATABASE.
    client.close();

    // SETTING MANUAL STATUS CODE AND OBJECT THAT SHOULD BE RETURNED AS RESPONSE.
    res.status(201).json({
      message: "meetup inserted.",
    });
  }
}

export default handler;
