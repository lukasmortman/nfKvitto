import Head from "next/head";
import HeaderBild from "../components/HeaderBild";
import adminStyles from '../styles/adminStyles.module.css'

export default function Custom404() {
    return (
        <>
            <Head>
                <title>NF Kvitton 404</title>
                <meta name="description"
                      content="404 page för NF kvitton."/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={adminStyles.container}>
                <HeaderBild/>
                <div>
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>Något gick fel</h1>
                </div>
            </div>

        </>
    )
}
