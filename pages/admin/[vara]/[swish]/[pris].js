import Head from "next/head";
import HeaderBild from "../../../../components/HeaderBild";
import styles from '../../../../styles/VisaKvitto.module.css'
import Link from "next/link";
const axios = require('axios').default;
import Image from 'next/image'
import {useRouter} from "next/router";
import {connectToDatabase} from "../../../../utils/mongodb";
const svgToMiniDataURI = require('mini-svg-data-uri');

export default function Home({bild,data}) {
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
                    <h3>swishnummer:  {data.swish}</h3>
                    <h3>pris: {data.pris}kr</h3>
                    <h3>vara: {data.vara} </h3>
                    <Image src={`${svgToMiniDataURI(bild)}`}
                           width={1}
                           height={1}
                           layout="responsive"
                           objectFit="cover"/>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const { db } = await connectToDatabase();
    const data = await db
        .collection("kvitton")
        .find({})
        .toArray();
    const dataFixad = JSON.parse(JSON.stringify(data))
    return {
        //the method should return always an object called paths, otherwise it will not work
        paths: dataFixad.map((data) => {
            return {
                params: {
                    vara: data.vara, swish: data.swish,  pris: data.pris.toString()
                },  fallback: true
            };
        }),
    };
}



export async function getStaticProps({params}) {
    let body = {
        format: "svg",
        payee: {value: params.swish, editable: false},
        amount: {value: params.pris, editable: false},
        message: {value: params.vara, editable: false},
    }

    let response = await axios.post('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', body)

    return {
        props: {
            bild: response.data, data: params
        },
    };
}
