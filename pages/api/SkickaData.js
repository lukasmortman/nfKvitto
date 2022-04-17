const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:halods1234@kvittodatabas.iivvn.mongodb.net/information?retryWrites=true&w=majority";

export default async function handler(req, res) {
    let data = (JSON.parse(req.body))
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("information");
        dbo.collection("kvitton").insertOne(data, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });

}

