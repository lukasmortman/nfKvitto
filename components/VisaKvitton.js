import Image from 'next/image'
import logo from "../public/loggan.jpg";
import styles from '../styles/VisaKvitto.module.css'

export default function VisaKvitton({data}) {
    return (
        <div className={styles.container}>
            <div className={styles.Header}>
                <Image
                    alt="nf logga"
                    src={logo}
                    priority={true}
                    quality={100}
                    layout={"responsive"}
                    className={styles.FlexAndCenter}
                    style={{marginTop: "1vh"}}
                />
                <h1 className={styles.FlexAndCenter} style={{margin: "-0.5vh"}}>nf kvitto</h1>
            </div>
            {data.map(({vara, pris, datum, swish, bild}) => (
                <div className={`${styles.FlexAndCenter} ${styles.Padding1REM}`}>
                    <div className={styles.BILD}>
                        <Image src={bild} alt={"bild på kvittot"} height={80} width={80}/>
                    </div>
                    <div className={styles.ROWFLEX}>
                        <p>namn på vara: {vara} </p>
                        <p>pris på vara: {pris}</p>
                        <p>datum köpt: {datum}</p>
                        <p>swishnummer: {swish}</p>
                    </div>
                </div>
            ))};
        </div>
    )

}

