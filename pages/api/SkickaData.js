import {connectToDatabase} from "../../utils/mongodb";

export default async function handler(req,res) {
    let data = (JSON.parse(req.body))

    const { db } = await connectToDatabase();
    const databasen = db.collection("kvitton")
    databasen.insertOne(data, function (err) {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }
    });
    res.status(200).json("kvitto inskickat")
}

