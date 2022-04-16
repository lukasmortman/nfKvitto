import Image from 'next/image'
import logo from "../public/loggan.jpg";
import styles from '../styles/VisaKvitto.module.css'
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

export default function VisaKvitton({data}) {
    function getSheetData(data, header) {
        const fields = Object.keys(data[0]);
        const sheetData = data.map(function (row) {
            return fields.map(function (fieldName) {
                return row[fieldName] ? row[fieldName] : "";
            });
        });
        sheetData.unshift(header);
        return sheetData;
    }
    async function saveAsExcel() {
        let header = ["id","vara","pris","datum","bild","swish"]
        XlsxPopulate.fromBlankAsync().then(async (workbook) => {
            const sheet1 = workbook.sheet(0);
            const sheetData = getSheetData(data, header);
            const totalColumns = sheetData[0].length;

            sheet1.cell("A1").value(sheetData);
            const range = sheet1.usedRange();
            const endColumn = String.fromCharCode(64 + totalColumns);
            sheet1.row(1).style("bold", true);
            sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
            range.style("border", true);
            return workbook.outputAsync().then((res) => {
                saveAs(res, "KvittonNF.xlsx");
            });
        });
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
                    <button className={styles.FlexAndCenter} onClick={()=>saveAsExcel()}>
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

