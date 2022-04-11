import {useState} from "react";
import logo from '../public/loggan.jpg'
import styles from './test.module.css'
import Image from 'next/image'

export default function SIDA() {
    const [state, setState] = useState({
        vara: "",
        pris: "",
        datum: "",
        bild: "",
        swish: ""
    })
    const [skickat,setSkickat] = useState("")


    const handleSubmit = event => {
        event.preventDefault();
        console.log(`varunamn: ${state.vara}`)
        console.log(`pris: ${state.pris}`)
        console.log(`datum: ${state.datum}`)
        console.log(`bild: ${state.bild}`)
        console.log(`swish: ${state.swish}`)
        postData(state)
        setState({
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            swish: ""
        })
        setSkickat("Kvitto inskickat")
        setTimeout(fixaText,5000)
        function fixaText(){
            setSkickat("")
        }

    };

    const handleChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    const postData = async (form) => {
        try {
            const res = await fetch('/api/Information', {
                method: 'POST',
                body: JSON.stringify(form),
            })
            if (!res.ok) {
                throw new Error(res.status)
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.Text}>
                <Image
                    alt="nf logga"
                    src={logo}
                    priority={true}
                    quality={100}
                    layout={"responsive"}
                    className={styles.FixaText}
                    style={{marginTop: "1vh"}}
                />
                <h1 className={styles.FixaText} style={{marginTop: "-0.5vh"}}>nf kvitto</h1>
            </div>
            <div className={styles.Form}>
                <form className={styles.formStyle} onSubmit={handleSubmit}>
                    <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                    <input type="text" name="vara" placeholder="varunamn" value={state.vara} required onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                    <input type="number" name="pris" placeholder="pris" value={state.pris} required onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                    <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                    <input type="file" name="bild" value={state.bild} placeholder="bild på kvitto" required onChange={handleChange}/>
                    <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                    <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                           pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={handleChange}/>
                    <span>
                        <button className={styles.buttonStyle} type="submit">
                            skicka in kvitto
                        </button>
                        <p style={{display: "inline-block",marginLeft:"0.5vw", fontWeight:"bold"}}>{skickat}</p>
                    </span>
                </form>
            </div>
        </div>
    )
}
