import {useState} from "react";
import styles from '../styles/SkickaKvitto.module.css'
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadString} from "firebase/storage";



export default function SkickaKvitto() {
    const [state, setState] = useState({
        vara: "",
        pris: "",
        datum: "",
        bild: "",
        swish: "",
        kategori: "",
    })
    const [skickat, setSkickat] = useState("")
    const [base64, setBase64] = useState("")


    const handleSubmit = event => {
        event.preventDefault();
        postData({vara:state.vara,pris:state.pris,kategori: state.kategori,datum:state.datum,bild:base64,swish:state.swish})
        setState({
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            swish: "",
            kategori: "",
        })
        setBase64("")
        setSkickat("Kvitto inskickat")
        setTimeout(fixaText, 5000)

        function fixaText() {
            setSkickat("")
        }

    };

    const handleChange = async event => {
        if (event.target.name === "bild") {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend =  function () {
                 setBase64(reader.result)
                console.log(reader.result)
            }
            reader.readAsDataURL(file);
            const value = event.target.value;
            setState({
                ...state,
                [event.target.name]: value
            });
        } else {
            const value = event.target.value;
            setState({
                ...state,
                [event.target.name]: value
            });
        }
    }


    function test(test){
        console.log("sending")
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
        let data = (JSON.parse(test))
        const storageRef = ref(storage, data.vara);
        const message4 = data.bild;
        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        }).then(async downloadURL => {
            bildurl = downloadURL
            try {
                if(state.kategori===""){
                    const res = await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({vara:state.vara,pris:Math.round(state.pris),kategori: "Laborationer",datum:state.datum,bild:downloadURL,swish:state.swish}),
                    });
                }else{
                    const res = await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({vara:state.vara,pris:Math.round(state.pris),kategori: state.kategori,datum:state.datum,bild:downloadURL,swish:state.swish}),
                    });
                }
            } catch (error) {
                console.log("error", error)
            }
        })
    }

    const postData = async (form) => {
        test(JSON.stringify(form))
    }


    return (
            <div className={styles.Form}>
                <form className={styles.formStyle} onSubmit={handleSubmit}>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="namn på vara" value={state.vara} maxLength={16} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris (skriv inte kr)" value={state.pris} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="kategori">kategori på köp:</label>
                    <select className={styles.kategori} name="kategori" id="kategori" required onChange={handleChange}>
                        <option value="Laborationer">Laborationer</option>
                        <option value="Kök&fester">Kök & fester</option>
                        <option value="Övrigt">Övrigt</option>
                    </select>
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" accept="image/*" name="bild" value={state.bild} placeholder="bild på kvitto" required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={handleChange}/>
                        <button className={styles.buttonStyle} type="submit">
                            skicka in kvitto
                        </button>
                    <p style={{display: "inline-block", marginLeft: "0.5vw", fontWeight: "bold", fontSize:"0.7rem"}}>{skickat}</p>
                </form>
            </div>
    )
}
