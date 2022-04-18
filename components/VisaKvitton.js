import Image from 'next/image'
import styles from '../styles/VisaKvitto.module.css'
import {saveAs} from "file-saver";
import XlsxPopulate from "xlsx-populate";
import { read, utils, write, writeFileXLSX } from "xlsx";


const alphabetList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

export default function VisaKvitton({data}) {
    function workbook2blob(workbook) {
        const wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary"
        };
        const wbout = write(workbook, wopts);
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        }
        return new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        });
    }

    function handleExport() {
        const table = [{Vara:"Vara",Pris:"Pris",Datum:"Datum",Bild:"Bild",Swish:"Swish"}]
        data.forEach((item) => {
            table.push({
                Vara: item.vara,
                Pris: item.pris,
                Datum: new Date(item.datum),
                Bild: item.bild,
                Swish: item.swish,
            });
        });
        const finalData = [...table];
        const wb = utils.book_new();
        const sheet = utils.json_to_sheet(finalData, {
            skipHeader: true
        });
        utils.book_append_sheet(wb, sheet, "test");
        const workbookBlob = workbook2blob(wb);
        const dataInfo = {
            theadRange: "A1:E1",
            tbodyRange: `A2:E${data.length+1}`,
            tDatum: `C2:C${data.length+1}`,
            tTelefonnummer: `E2:E${data.length+1}`,
            tVara: `B2:B${data.length+1}`,
            tLankar: `D2:D${data.length+1}`
        };
        return addStyle(workbookBlob, dataInfo);
    }
    function addStyle(workbookBlob, dataInfo) {
        return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
            workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                    fontFamily: "Arial",
                    verticalAlignment: "center"
                });
                sheet.gridLinesVisible(false);
                alphabetList.forEach((name) => {
                    sheet.column(name).width(18);
                });
                sheet.range(dataInfo.tbodyRange).style({
                    horizontalAlignment: "left",
                });
                sheet.range(dataInfo.theadRange).style({
                    horizontalAlignment: "left",
                });
                sheet.range(dataInfo.tDatum).style("numberFormat","[$-x-sysdate]DDDD, MMMM DD, ÅÅÅÅ");
                sheet.range(dataInfo.tTelefonnummer).style("numberFormat","#0000000000");
                sheet.range(dataInfo.tVara).style("numberFormat","###0kr;-###0kr");
            });
            return workbook.outputAsync().then((res) => {
                saveAs(res, "KvittonNF.xlsx");
            });
        });
    }

    return (
       <>
            <span className={styles.FlexAndCenter}>
                    <button className={styles.FlexAndCenter} onClick={()=> handleExport()}>
                        exportera till excel
                    </button>
                </span>
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
        </>
    )

}

