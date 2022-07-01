import VisaKvitton from "../../components/VisaKvitton";
import Head from "next/head";
import {connectToDatabase} from "../../utils/mongodb";
import HeaderBild from "../../components/HeaderBild";
import adminStyles from '../../styles/adminStyles.module.css'

export default function Home({data}) {
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
            <div className={adminStyles.container}>
                <HeaderBild />
                <VisaKvitton data={data}/>
            </div>
        </>
    )
}
export async function getStaticProps() {
    const { db } = await connectToDatabase();
    const data = await db
        .collection("kvitton")
        .find({})
        .toArray();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        }
    };
}
