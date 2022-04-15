import VisaKvitton from "../components/VisaKvitton";
import Head from "next/head";
import {connectToDatabase} from "../utils/mongodb";

export default function Home({data}) {
    return (
        <>
            <Head>
                <title>NF Kvitton</title>
                <meta name="description"
                      content="Hemsida för att se inlagda kvitton."/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <VisaKvitton data={data}/>
        </>
    )
}
export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const data = await db
        .collection("kvitton")
        .find({})
        .toArray();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
}
