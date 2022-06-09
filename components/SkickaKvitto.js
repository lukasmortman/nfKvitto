import {useState} from "react";
import styles from '../styles/SkickaKvitto.module.css'
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadString} from "firebase/storage";
const axios = require('axios').default;

export default function SkickaKvitto() {
    const [state, setState] = useState({
        vara: "",
        pris: "",
        datum: "",
        bild: "",
        swish: "",
        kategori: "",
        typavkop: "",
        qrkod: ""
    })
    const [skickat, setSkickat] = useState("")
    const [base64, setBase64] = useState("")
    const [swishqr, setSwishqr] = useState("")


    const handleSubmit = event => {
        event.preventDefault();
        test(JSON.stringify({
            vara: state.vara,
            pris: state.pris,
            kategori: state.kategori,
            datum: state.datum,
            bild: base64,
            swish: state.swish,
            qrkod: swishqr
        }))
        setState({
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            swish: "",
            kategori: "",
            qrkod: ""
        })
        setBase64("")
        setSwishqr("")
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
            reader.onloadend = function () {
                setBase64(reader.result)
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


    async function test(test) {
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
        let data = (JSON.parse(test))
        //TODO: LÄGG TILL SÅ ATT MAN AUTOMATISKT LÄGGER IN SWISH GENOM APIN, DEN BORDE UPPLADA DATAN TILL SIDAN
        const storageRef = ref(storage, data.vara);
        const message4 = data.bild;

        let body = {
            format: "svg",
            payee: {value: "0725665551", editable: false},
            amount: {value: 23, editable: false},
            message: {value: "Stålull", editable: false},
        }
        let response = await axios.post('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', body)
        const reader2 = new FileReader();
        reader2.onloadend = function () {
            setSwishqr(reader2.result)
        }
        reader2.readAsDataURL(response.data);

        const storageRef2 = ref(storage, `${data.vara}SWISH`);
        const message5 = data.qrkod;

        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        }).then(async downloadURL => {
            uploadString(storageRef2, message5, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(async downloadURL2 => {
                try {
                    if (state.kategori === "" && state.typavkop === "intäkt") {
                        await fetch('/api/SkickaData', {
                            method: 'POST',
                            body: JSON.stringify({
                                vara: state.vara,
                                pris: Math.round(state.pris),
                                kategori: "Medlemsavgifter",
                                datum: state.datum,
                                bild: downloadURL,
                                swish: state.swish,
                                qrkod: downloadURL2
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
                                qrkod: downloadURL2
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
                                qrkod: downloadURL2
                            }),
                        });
                    }

                } catch (error) {
                    console.log("error", error)
                }
            })
        })
    }


    // TODO: går kanske att göra varje return till en egen komponent och flytta logiken ovan till komponenternas sida, hade varit lättare att läsa
    // TODO: och hade varit lättare att redigera
    return state.typavkop === "avgift"
        ? (
            <div className={styles.Form}>
                <div className={styles.centerKnappar}>
                    <button name="typavkop" onClick={() => setState({...state, "typavkop": "avgift"
                    })}>avgifter
                    </button>
                    <button name="typavkop" onClick={() => setState({...state, "typavkop": "intäkt"
                    })}>intäkt
                    </button>
                </div>
                <form className={styles.formStyle} onSubmit={handleSubmit}>
                    <label className={styles.labelStyle} htmlFor="kategori">kategori på avgift:</label>
                    <select className={styles.kategori} name="kategori" id="kategori" defaultValue={state.kategori}
                            required onChange={handleChange}>
                        <option value="Laborationer">Laborationer</option>
                        <option value="Kök&fester">Kök & fester</option>
                        <option value="Försäljning">Försäljning</option>
                        <option value="NF-artiklar">NF-artiklar</option>
                        <option value="Övrigt">Övrigt</option>
                    </select>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="namn på vara (max 16 tecken)" value={state.vara}
                           maxLength={16} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris (skriv inte kr)" value={state.pris} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" accept="image/*" name="bild" value={state.bild} style={{alignSelf: "center"}}
                           placeholder="bild på kvitto"
                           required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={handleChange}/>
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
        ) : state.typavkop === "intäkt" ?
        (
            <div className={styles.Form}>
                <div className={styles.centerKnappar}>
                    <button name="typavkop" onClick={() => setState({...state, "typavkop": "avgift"
                    })}>avgifter
                    </button>
                    <button name="typavkop" onClick={() => setState({...state, "typavkop": "intäkt"
                    })}>intäkt
                    </button>
                </div>
                <form className={styles.formStyle} onSubmit={handleSubmit}>
                    <label className={styles.labelStyle} htmlFor="kategori">kategori på intäkt:</label>
                    <select className={styles.kategori} name="kategori" id="kategori" defaultValue={state.kategori}
                            required onChange={handleChange}>
                        <option value="Medlemsavgifter">Medlemsavgifter</option>
                        <option value="Kök&fester">Kök & fester</option>
                        <option value="Försäljning">Försäljning</option>
                        <option value="NF-artiklar">NF-artiklar</option>
                        <option value="Övrigt">Övrigt</option>
                    </select>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="namn på vara (max 16 tecken)" value={state.vara}
                           maxLength={16} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris (skriv inte kr)" value={state.pris} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" accept="image/*" name="bild" value={state.bild} style={{alignSelf: "center"}}
                           placeholder="bild på kvitto"
                           required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={handleChange}/>
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
                        <button name="typavkop" onClick={() => setState({...state, "typavkop": "avgift"
                        })}>avgifter
                        </button>
                        <button name="typavkop" onClick={() => setState({...state, "typavkop": "intäkt"
                        })}>intäkt
                        </button>
                    </div>
                </div>
            )
}
