import Head from "next/head";
import HeaderBild from "../../components/HeaderBild";
import styles from '../../styles/VisaKvitto.module.css'
import Link from "next/link";
const axios = require('axios').default;
import Image from 'next/image'
import {useRouter} from "next/router";

export default function Home({data}) {
    let url;
    const router = useRouter()
    const info  = router.query

    if (typeof window !== 'undefined') {
        let blob = new Blob([data], {type: 'image/svg+xml'});
         url = URL.createObjectURL(blob);
    } else {
        url = "https://i.imgur.com/2wy20X6.jpg"
    }

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
                    alignSelf: "center",
                    textAlign: "center"
                }}>
                    <Link href="/admin">
                        <button>tillbaka</button>
                    </Link>
                    <h3>swishnummer:  {info.swish}</h3>
                    <h3>pris: {info.pris}kr</h3>
                    <h3>vara: {info.swishVara} </h3>
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

export async function getServerSideProps(ctx) {
    const info  = ctx.query
    let response = await axios.get(process.env.baseURL+`/api/${info.swishVara}?pris=${info.pris}&swishnummer=${info.swish}`)
    return {
        props: {
            data: response.data
        },
    };
}
