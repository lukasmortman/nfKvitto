import Head from "next/head";
import HeaderBild from "./HeaderBild";
import adminStyles from '../styles/adminStyles.module.css'
import Image from 'next/image'


export default async function Swish(data) {
    return (
        <>
            <Head>
                <title>swish</title>
                <meta name="description"
                      content="visa swish-qrkod."/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={adminStyles.container}>
                <HeaderBild/>
                <p>{data}</p>
            </div>

        </>
    )
}
