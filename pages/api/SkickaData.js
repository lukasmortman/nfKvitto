import {getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:halods1234@kvittodatabas.iivvn.mongodb.net/information?retryWrites=true&w=majority";

export default async function handler(req, res) {
    let bildurl;
    const firebaseConfig = {
        apiKey: "AIzaSyC3Okk1Aa2n5P_4ovSGoqwH7Q5cfjZO_l4",
        authDomain: "nfkvitton.firebaseapp.com",
        projectId: "nfkvitton",
        storageBucket: "nfkvitton.appspot.com",
        messagingSenderId: "773494506675",
        appId: "1:773494506675:web:82c77ade0673e7cc651cc6",
        measurementId: "G-8YPG6B5MDF"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp)
    let data = (JSON.parse(req.body))
    const storageRef = ref(storage, data.vara);
    const message4 = data.bild;
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    }).then(downloadURL => {
        bildurl = downloadURL
        data.bild = downloadURL
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("information");
            dbo.collection("kvitton").insertOne(data, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    })
        .catch((err) => console.log(err))
}

