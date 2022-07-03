const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;

export default async function handler(req,res) {
    let data = req.body
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("information");
        const myquery = {vara: data.varaInnan, datum: data.datumInnan, pris: Number(data.prisInnan)};
        const newvalues = {
            $set: {
                vara: data.vara,
                pris: Number(data.pris),
                swish: data.swish,
                datum: data.datum,
                kategori: data.kategori
            }
        };
        dbo.collection("kvitton").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
    res.status(200).end()
}
