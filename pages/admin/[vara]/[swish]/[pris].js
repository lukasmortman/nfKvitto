import Head from "next/head";
import HeaderBild from "../../../../components/HeaderBild";
import styles from '../../../../styles/VisaKvitto.module.css'
import Link from "next/link";

const axios = require('axios').default;
import Image from 'next/image'
import {useRouter} from "next/router";
import {connectToDatabase} from "../../../../utils/mongodb";
import {useState} from "react";

const qs = require('qs');
const svgToMiniDataURI = require('mini-svg-data-uri');

export default function Home({bild, attDisplera}) {
    const [state, setState] = useState({...attDisplera})
    const [byt, setByt] = useState(false)
    const router = useRouter()
    if (router.isFallback) {
        return <>
            <Head>
                <title>Kvitto</title>
                <meta name="description" content="Hemsida för att se inlagda kvitton."/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={styles.container}>
                <HeaderBild/>
                <div style={{
                    alignSelf: "center",
                    textAlign: "center"
                }}>
                    <Link href="/admin">
                        <button>tillbaka</button>
                    </Link>
                    <button onClick={() => setByt(true)}>ändra kvitto</button>
                    <h3>vara:</h3>
                    <h3>pris:</h3>
                    <h3>kategori:</h3>
                    <h3>datum:</h3>
                    <h3>swishnummer:</h3>
                </div>
            </div>
        </>
    }

    const hanteraNytt = async event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        });
    }

    const hanteraSubmit = async event => {
        event.preventDefault();
        const data = qs.stringify({
            'varaInnan': attDisplera.vara,
            'datumInnan': attDisplera.datum,
            'prisInnan': Number(attDisplera.pris),
            'fixadInnan': attDisplera.fixad,
            'vara': state.vara,
            'pris': Number(state.pris),
            'datum': state.datum,
            'swish': state.swish,
            'kategori': state.kategori,
            "fixad": JSON.parse(state.fixad)
        });
        const config = {
            method: 'post',
            url: `/api/UpdateraData`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                router.push(`/admin/${state.vara}/${state.swish}/${state.pris + "€" + state.datum + "€" + state.kategori+ "€" + state.fixad}`)
                setByt(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return byt === false
        ? (
            <>
                <Head>
                    <title>{`Kvitto för ${attDisplera.vara}`}</title>
                    <meta name="description" content="Hemsida för att se inlagda kvitton."/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <div className={styles.container}>
                    <HeaderBild/>
                    <div style={{
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Link href="/admin">
                            <button>tillbaka</button>
                        </Link>
                        <button onClick={() => setByt(true)}>ändra kvitto</button>
                        <h3>vara: {attDisplera.vara} </h3>
                        <h3>pris: {attDisplera.pris}kr</h3>
                        <h3>kategori: {attDisplera.kategori} </h3>
                        <h3>datum: {attDisplera.datum}</h3>
                        <h3>swishnummer: {attDisplera.swish}</h3>
                        <h3>fixad: {attDisplera.fixad}</h3>
                        <Image src={`${svgToMiniDataURI(bild)}`}
                               width={1}
                               height={1}
                               layout="responsive"
                               objectFit="cover"/>
                    </div>
                </div>
            </>
        ) : (
            <>
                <Head>
                    <title>{`Kvitto för ${attDisplera.vara}`}</title>                    <meta name="description" content="Hemsida för att se inlagda kvitton."/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <div className={styles.container}>
                    <HeaderBild/>
                    <div style={{
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Link href="/admin">
                            <button>tillbaka test</button>
                        </Link>
                        <button onClick={() => setByt(false)}>sluta ändra kvitto</button>
                        <form onSubmit={hanteraSubmit} onChange={hanteraNytt}>
                            <h3>vara: <input type="text" id="vara" defaultValue={state.vara}/></h3>
                            <h3>pris: <input type="number" id="pris" defaultValue={state.pris}/>kr </h3>
                            <h3>kategori: <select name="kategori" id="kategori" defaultValue={state.kategori}>
                                <option value="Laborationer" name="Laborationer">Laborationer</option>
                                <option value="Medlemsavgifter" name="Medlemsavgifter">Medlemsavgifter</option>
                                <option value="Kök&fester">Kök & fester</option>
                                <option value="Försäljning">Försäljning</option>
                                <option value="NF-artiklar">NF-artiklar</option>
                                <option value="Övrigt">Övrigt</option>
                            </select></h3>
                            <h3>datum: <input type="date" id="datum" defaultValue={state.datum}/></h3>
                            <h3>fixad: <input onChange={(e) => e.target.value = e.target.checked} type="checkbox" id="fixad" checked={JSON.parse(state.fixad)}/></h3>
                            <h3>swishnummer: <input type="tel" id="swish" defaultValue={state.swish}/></h3>
                            <button type="submit">genomför ändring</button>
                        </form>
                    </div>
                </div>

            </>
        )

}

export async function getStaticPaths() {
    const {db} = await connectToDatabase();
    const data = await db
        .collection("kvitton")
        .find({})
        .toArray();
    const dataFixad = JSON.parse(JSON.stringify(data))
    const paths = dataFixad.map((data) => ({
        params: {
            vara: data.vara, swish: data.swish, pris: data.pris.toString() + "€" + data.datum + "€" + data.kategori + "€" + data.fixad
        }
    }))
    return {paths, fallback: true};
}


export async function getStaticProps({params}) {
    let pris = params.pris.split("€")[0]
    let datum = params.pris.split("€")[1]
    let kategori = params.pris.split("€")[2]
    let fixad = params.pris.split("€")[3]
    let body = {
        format: "svg",
        payee: {value: params.swish, editable: false},
        amount: {value: pris, editable: false},
        message: {value: params.vara, editable: false},
    }

    let response = await axios.post('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', body)
    const data = {
        vara: params.vara, pris: pris, swish: params.swish, datum: datum, kategori: kategori, fixad: fixad
    }
    return {
        props: {
            bild: response.data, attDisplera: data
        },
    };
}
