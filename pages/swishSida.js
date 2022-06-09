import Swish from "../components/swish";
import Head from "next/head";
import HeaderBild from "../components/HeaderBild";
import styles from '../styles/VisaKvitto.module.css'
import Link from "next/link";

const axios = require('axios').default;
import Image from 'next/image'

export default function Home({data}) {
    const bild = data[0]
    return (
        <>
            <Head>
                <title>NF Kvitton Admin Page</title>
                <meta name="description"
                      content="Hemsida för att se inlagda kvitton."/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={styles.container}>
                <HeaderBild/>
                <div style={{
                    width: "20vw",
                    alignSelf: "center",
                    textAlign: "center"
                }}>
                    <Link href="/admin">
                        <button>tillbaka</button>
                    </Link>
                    <h3>vara: Stållull</h3>
                    <h3>pris: 23kr</h3>
                    <h3>swishnummer: 0725665551</h3>
                    <Image src="https://i.imgur.com/vBR0hoF.jpg"
                           width={1}
                           height={1}
                           layout="responsive"
                           objectFit="cover"/>
                    <p>{data}</p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    let body = {
        format: "svg",
        payee: {value: "0725665551", editable: false},
        amount: {value: 23, editable: false},
        message: {value: "Stålull", editable: false},
    }

    let response = await axios.post('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', body)
    return {
        props: {
            data: response.data
        },
    };
}
