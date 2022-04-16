import Image from 'next/image'
import logo from "../public/loggan.jpg";
import styles from '../styles/VisaKvitto.module.css'
import exportFromJSON from 'export-from-json'

export default function VisaKvitton({data}) {
    const exportType = "xls"
    const fileName = 'kvittonNF'
    const fields = ["vara","pris","bild","datum","swish"]
    function ExportToExcel() {
        exportFromJSON({ data, fileName, exportType, fields })
    }

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
                <span className={styles.FlexAndCenter}>
                    <button className={styles.FlexAndCenter} onClick={()=>ExportToExcel()}>
                        exportera till excel
                    </button>
                </span>

            </div>
            <div className={styles.Padding1REM}>
                {data.map(({vara, pris, datum, swish, bild}) => (
                    <div className={`${styles.parent}`} key={vara}>
                        <div className={styles.div5}>
                            <Image src={bild} alt={"bild på kvittot"} height={80} width={80}/>
                        </div>
                        <div className={styles.div1}><p>namn på vara: {vara} </p>
                        </div>
                        <div className={styles.div2}><p>pris på vara: {pris}</p>
                        </div>
                        <div className={styles.div3}><p>datum köpt: {datum}</p>
                        </div>
                        <div className={styles.div4}><p>swishnummer: {swish}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

