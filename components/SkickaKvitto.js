import {useState} from "react";
import logo from '../public/loggan.jpg'
import styles from '../styles/SkickaKvitto.module.css'
import Image from 'next/image'


export default function SkickaKvitto() {
    const [state, setState] = useState({
        vara: "",
        pris: "",
        datum: "",
        bild: "",
        swish: "",
    })
    const [skickat, setSkickat] = useState("")
    const [base64, setBase64] = useState("")


    const handleSubmit = event => {
        event.preventDefault();
        postData({vara:state.vara,pris:state.pris,datum:state.datum,bild:base64,swish:state.swish})
        setState({
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            swish: ""
        })
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

    const postData = async (form) => {
        try {
            const res = await fetch('/api/SkickaData', {
                method: 'POST',
                body: JSON.stringify(form),
            });
        } catch (error) {
            console.log("error", error)
        }
    }


    return (
            <div className={styles.Form}>
                <form className={styles.formStyle} onSubmit={handleSubmit}>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="varunamn" value={state.vara} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris" value={state.pris} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" name="bild" value={state.bild} placeholder="bild på kvitto" required
                           onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={handleChange}/>
                        <button className={styles.buttonStyle} type="submit">
                            skicka in kvitto
                        </button>
                    <p style={{display: "inline-block", marginLeft: "0.5vw", fontWeight: "bold", fontSize:"0.7rem"}}>{skickat}</p>
                    <input id="file" type="file" accept="image/*">test</input>
                </form>
            </div>
    )
}
