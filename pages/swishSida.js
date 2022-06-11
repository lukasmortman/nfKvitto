import Swish from "../components/swish";
import Head from "next/head";
import HeaderBild from "../components/HeaderBild";
import styles from '../styles/VisaKvitto.module.css'
import Link from "next/link";

const axios = require('axios').default;
import Image from 'next/image'

export default function Home({data}) {
    let blob = new Blob([data], {type: 'image/svg+xml'});
    let url = URL.createObjectURL(blob);

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
                    <Image src={`${url}`}
                           width={1}
                           height={1}
                           layout="responsive"
                           objectFit="cover"/>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    let response = await axios.get("http://localhost:3000/api/swishData")
    return {
        props: {
            data: response.data
        },
    };
}
