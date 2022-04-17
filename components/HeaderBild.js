import XlsxPopulate from "xlsx-populate";
import styles from "../styles/VisaKvitto.module.css";
import Image from "next/image";
import logo from "../public/loggan.jpg";

export default function HeaderBild() {
    return (
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
    )

}
