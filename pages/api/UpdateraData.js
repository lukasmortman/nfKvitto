import {connectToDatabase} from "../../utils/mongodb";

export default async function handler(req, res) {
    const {db} = await connectToDatabase();
    const databasen = db.collection("kvitton")
    let data = req.body
    const attByta = {vara: data.varaInnan, datum: data.datumInnan, pris: Number(data.prisInnan), fixad: JSON.parse(data.fixadInnan)};

    const attBytaTill = {
        $set: {
            vara: data.vara,
            pris: Number(data.pris),
            swish: data.swish,
            datum: data.datum,
            kategori: data.kategori,
            fixad: JSON.parse(data.fixad)
        }
    };
    databasen.findOneAndUpdate(attByta, attBytaTill, function (err) {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }
    });
    res.status(200).json(`kvitto uppdaterat`)
}


//TODO: TA BORT .ENV.PRODUCTION FRÅN GIT

