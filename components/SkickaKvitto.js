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
        typavkop: "",
    })
    const [skickat, setSkickat] = useState("")
    const [base64, setBase64] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        laddaUppBildOchData({
            vara: state.vara,
            bild: base64,
        })
        setState({
            ...state,
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            swish: "",
        })
        setBase64("")
        setSkickat("Kvitto inskickat!")
        setTimeout(fixaText, 5000)

        function fixaText() {
            setSkickat("")
        }

    };

    const hanteraNytt = async event => {
        if (event.target.name === "bild") {
            const reader = new FileReader();
            reader.onloadend = function () {
                setBase64(reader.result)
            }
            reader.readAsDataURL(event.target.files[0]);

            const value = event.target.value;
            setState({
                ...state,
                [event.target.name]: value
            });
        } else if (event.target.value === "Laborationer" && state.typavkop === "intäkt") {
            setState({
                ...state,
                [event.target.name]: "Medlemsavgifter"
            });
        } else if (event.target.value === "Medlemsavgifter" && state.typavkop === "avgift") {
            setState({
                ...state,
                [event.target.name]: "Laborationer"
            });
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
        }
    }

    function laddaUppBildOchData(data) {
        const firebaseConfig = {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            projectId: process.env.projectId,
            storageBucket: "nfkvitton.appspot.com",
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId,
            measurementId: process.env.measurementId
        };
        const firebaseApp = initializeApp(firebaseConfig);
        const storage = getStorage(firebaseApp)
        const storageRef = ref(storage, data.vara);
        const message4 = data.bild;

        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        }).then(async downloadURL => {
            try {
                if (state.kategori === "Laborationer" && state.typavkop === "intäkt") {
                    await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({
                            vara: state.vara,
                            pris: Math.round(state.pris),
                            kategori: "Medlemsavgifter",
                            datum: state.datum,
                            bild: downloadURL,
                            swish: state.swish,
                            typavköp: state.typavkop
                        }),
                    });
                } else if (state.kategori === "Medlemsavgifter" && state.typavkop === "avgift") {
                    await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({
                            vara: state.vara,
                            pris: Math.round(state.pris),
                            kategori: "Laborationer",
                            datum: state.datum,
                            bild: downloadURL,
                            swish: state.swish,
                            typavköp: state.typavkop
                        }),
                    });
                } else if (state.kategori === "" && state.typavkop === "intäkt") {
                    await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({
                            vara: state.vara,
                            pris: Math.round(state.pris),
                            kategori: "Medlemsavgifter",
                            datum: state.datum,
                            bild: downloadURL,
                            swish: state.swish,
                            typavköp: state.typavkop
                        }),
                    });
                } else if (state.kategori === "" && state.typavkop === "avgift") {
                    await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({
                            vara: state.vara,
                            pris: Math.round(state.pris),
                            kategori: "Laborationer",
                            datum: state.datum,
                            bild: downloadURL,
                            swish: state.swish,
                            typavköp: state.typavkop
                        }),
                    });
                } else {
                    await fetch('/api/SkickaData', {
                        method: 'POST',
                        body: JSON.stringify({
                            vara: state.vara,
                            pris: Math.round(state.pris),
                            kategori: state.kategori,
                            datum: state.datum,
                            bild: downloadURL,
                            swish: state.swish,
                            typavköp: state.typavkop
                        }),
                    });
                }
            } catch (error) {
                console.log("error", error)
            }
        })
    }

    function vilkenSkaVisas(typ) {
        if (typ === "Laborationer") {
            return state.typavkop === "intäkt";
        } else if (typ === "Medlemsavgifter") {
            return state.typavkop === "avgift";
        }
    }

    function vilkenDefaultValue() {
        if (state.typavkop === "intäkt" && state.kategori === "") {
            return "Medlemsavgifter"
        } else if (state.typavkop === "avgift" && state.kategori === "") {
            return "Laborationer"
        } else if (state.typavkop === "avgift" && state.kategori === "Medlemsavgifter") {
            return "Laborationer"
        } else if (state.typavkop === "intäkt" && state.kategori === "Laborationer") {
            return "Medlemsavgifter"
        } else {
            return state.kategori
        }
    }

    return state.typavkop !== ""
        ? (
            <div className={styles.Form}>
                <div className={styles.centerKnappar}>
                    <button name="typavkop" value="avgift" onClick={hanteraNytt}>avgifter
                    </button>
                    <button name="typavkop" value="intäkt" onClick={hanteraNytt}>intäkt
                    </button>
                </div>
                <form className={styles.formStyle} onSubmit={handleSubmit} onChange={hanteraNytt}>
                    <label className={styles.labelStyle} htmlFor="kategori">kategori på {state.typavkop}:</label>
                    <select className={styles.kategori} name="kategori" id="kategori" value={vilkenDefaultValue()}
                            required>
                        <option value="Laborationer" name="Laborationer"
                                hidden={vilkenSkaVisas("Laborationer")}>Laborationer
                        </option>
                        <option value="Medlemsavgifter" name="Medlemsavgifter"
                                hidden={vilkenSkaVisas("Medlemsavgifter")}>Medlemsavgifter
                        </option>
                        <option value="Kök&fester">Kök & fester</option>
                        <option value="Försäljning">Försäljning</option>
                        <option value="NF-artiklar">NF-artiklar</option>
                        <option value="Övrigt">Övrigt</option>
                    </select>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="namn på vara (max 16 tecken)" value={state.vara}
                           maxLength={16} required
                    />
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris (skriv inte kr)" value={state.pris} required
                    />
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required
                    />
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" accept="image/*" name="bild" value={state.bild} style={{alignSelf: "center"}}
                           placeholder="bild på kvitto"
                           required
                    />
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}"/>
                    <button className={styles.buttonStyle} type="submit">
                        skicka in kvitto
                    </button>
                    <p style={{
                        display: "inline-block",
                        marginLeft: "0.5vw",
                        fontWeight: "bold",
                        fontSize: "0.7rem"
                    }}>{skickat}</p>
                </form>
            </div>
        ) : (
            <div className={styles.Form}>
                <div className={styles.centerKnappar}>
                    <button name="typavkop" onClick={() => setState({
                        ...state, "typavkop": "avgift"
                    })}>avgifter
                    </button>
                    <button name="typavkop" onClick={() => setState({
                        ...state, "typavkop": "intäkt"
                    })}>intäkt
                    </button>
                </div>
            </div>
        )
}
