import Image from 'next/image'
import styles from '../styles/VisaKvitto.module.css'
import {saveAs} from "file-saver";
import Link from 'next/link'
const ExcelJS = require('exceljs');
const alphabetList = [
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
    "Z",
    "Z"
];

export default function VisaKvitton({data}) {
    async function handleExport() {
        const workbook = new ExcelJS.Workbook();

        workbook.creator = 'Lukas Mörtman';
        workbook.created = new Date();

        const sheet = workbook.addWorksheet(new Date().getFullYear().toString());
        sheet.columns = [
            {header: 'Datum', key: 'datum'},
            {header: 'Namn', key: 'namn'},
            {header: 'Ver', key: 'ver'},
            {header: 'Kassa', key: 'kassaDebit'},
            {header: '', key: 'kassaKredit'},
            {header: 'Bank', key: 'bankDebit'},
            {header: '', key: 'bankKredit'},
            {header: 'Medlemsavgifter', key: 'medlemsavgifterDebit'},
            {header: '', key: 'medlemsavgifterKredit'},
            {header: 'Bidrag', key: 'bidragDebit'},
            {header: '', key: 'bidragKredit'},
            {header: 'Laborationer', key: 'laborationerDebit'},
            {header: '', key: 'laborationerKredit'},
            {header: 'Kök & fester', key: 'kökDebit'},
            {header: '', key: 'kökKredit'},
            {header: 'Försäljning', key: 'försäljningDebit'},
            {header: '', key: 'försäljningKredit'},
            {header: 'NF-artiklar', key: 'artiklarDebit'},
            {header: '', key: 'artiklarKredit'},
            {header: 'Skuld', key: 'skuldDebit'},
            {header: '', key: 'skuldKredit'},
            {header: 'Övrigt', key: 'övrigtDebit'},
            {header: '', key: 'övrigtKredit'},
            {header: 'Diverse konton', key: 'diverseDebit'},
            {header: '', key: 'diverseKredit'},
        ];
        const fixaborders = () => {
            for (let i = 0; i < 11; i++) {
                sheet.getColumn(`${alphabetList[(i * 2) + 2]}`).style = {
                    border: {
                        left: {
                            style: "thin"
                        },
                    },
                }
                sheet.getColumn(`${alphabetList[(i * 2) + 2]}`).eachCell(function (cell) {
                    cell.style = {
                        border: {
                            left: {
                                style: "thin"
                            },
                        }
                    };

                })
                sheet.getColumn(`${alphabetList[(i)]}`).eachCell(function (cell) {
                    cell.alignment = {
                        horizontal: "left"
                    }

                })
            }
            sheet.getColumnKey("datum").style = {
                border: {
                    right: {
                        style: "thin"
                    },
                }
            }
            sheet.getColumnKey("namn").style = {
                border: {
                    right: {
                        style: "medium"
                    }
                }
            }
            sheet.getColumnKey("ver").style = {
                border: {
                    right: {
                        style: "medium"
                    },
                    left: {
                        style: "medium"
                    }
                }
            }
            sheet.getColumnKey("namn").eachCell(function (cell, rowNumber) {
                cell.style = {
                    border: {
                        right: {
                            style: "medium"
                        },
                        left: {
                            style: "thin"
                        }
                    }
                }
            });
            sheet.getColumn("D").style = {
                border: {
                    left: {
                        style: "medium"
                    }
                }
            }
            sheet.getColumn("D").eachCell(function (cell, rowNumber) {
                cell.style = {
                    border: {
                        left: {
                            style: "medium"
                        }
                    }
                }
            });
            sheet.getColumnKey("ver").eachCell(function (cell, rowNumber) {
                cell.style = {
                    border: {
                        right: {
                            style: "medium"
                        },
                        left: {
                            style: "medium"
                        }
                    }
                }
            });
        }
        const fixadatavisare = () => {
            sheet.getColumnKey("datum").numFmt = "[$-x-sysdate]DDDD, MMMM DD, aaaa"
            sheet.getColumnKey("kassaKredit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("laborationerDebit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("kassaDebit").eachCell(function (cell, rowNumber) {
                cell.numFmt = "###0k\\r;-###0k\\r"
            });
            sheet.getColumnKey("övrigtDebit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("kökDebit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("medlemsavgifterKredit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("försäljningKredit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getColumnKey("artiklarKredit").numFmt = "###0k\\r;-###0k\\r"
            sheet.getCell("C1").style = {
                fill: {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: {argb: 'BDD7EE'},
                    bgColor: {argb: 'BDD7EE'}
                },
                alignment: {horizontal: "center"}
            }
            sheet.getCell("A2").style = {
                border: {
                    bottom: {
                        style: "thin"
                    },
                    right: {
                        style: "thin"
                    }
                }
            }
            sheet.getCell("B2").style = {
                border: {
                    bottom: {
                        style: "thin"
                    },right: {
                        style: "medium"
                    },
                    left: {
                        style: "thin"
                    }
                }
            }
            sheet.getCell("C2").style = {
                border: {
                    bottom: {
                        style: "thin"
                    },right: {
                        style: "medium"
                    }
                },
                fill: {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: {argb: 'BDD7EE'},
                    bgColor: {argb: 'BDD7EE'}
                },
                alignment: {horizontal: "center"}
            }
        }
        sheet.addRow({
            ver: "nr",
            kassaDebit: "Debit",
            kassaKredit: "Kredit",
            bankDebit: "Debit",
            bankKredit: "Kredit",
            medlemsavgifterDebit: "Debit",
            medlemsavgifterKredit: "Kredit",
            bidragDebit: "Debit",
            bidragKredit: "Kredit",
            laborationerDebit: "Debit",
            laborationerKredit: "Kredit",
            kökDebit: "Debit",
            kökKredit: "Kredit",
            försäljningDebit: "Debit",
            försäljningKredit: "Kredit",
            artiklarDebit: "Debit",
            artiklarKredit: "Kredit",
            skuldDebit: "Debit",
            skuldKredit: "Kredit",
            övrigtDebit: "Debit",
            övrigtKredit: "Kredit",
            diverseDebit: "Debit",
            diverseKredit: "Kredit"
        })
        let exceldata = data.sort((a, b) =>  new Date(a.datum) - new Date(b.datum));
        exceldata.forEach((item, i) => {
            let datums = new Date(item.datum);
            let priset = Number(item.pris)
            if(item.typavköp === "avgift"){
                if(item.kategori === "Kök&fester"){
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums,kökDebit:priset });
                }else if(item.kategori === "Laborationer"){
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums,laborationerDebit:priset });
                }else if(item.kategori === "Övrigt") {
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums, övrigtDebit: priset});
                }else if(item.kategori === "Medlemsavgifter") {
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums, medlemsavgifterDebit: priset});
                }else if(item.kategori === "Försäljning") {
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums, försäljningDebit: priset});
                }else if(item.kategori === "NF-artiklar") {
                    sheet.addRow({kassaKredit: priset, ver: i + 1, datum: datums, artiklarDebit: priset});
                }
                sheet.getCell(`B${i+3}`).value = {
                    hyperlink: item.bild,
                    text: item.vara
                }
            }else if(item.typavköp === "intäkt"){
                if(item.kategori === "Kök&fester"){
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums,kökKredit:priset });
                }else if(item.kategori === "Laborationer"){
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums,laborationerKredit:priset });
                }else if(item.kategori === "Övrigt") {
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums, övrigtKredit: priset});
                }else if(item.kategori === "Medlemsavgifter") {
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums, medlemsavgifterKredit: priset});
                }else if(item.kategori === "Försäljning") {
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums, försäljningKredit: priset});
                }else if(item.kategori === "NF-artiklar") {
                    sheet.addRow({kassaDebit: priset, ver: i + 1, datum: datums, artiklarKredit: priset});
                }
                sheet.getCell(`B${i+3}`).value = {
                    hyperlink: item.bild,
                    text: item.vara
                }
            }

        });
        fixaborders()
        for (let i = 0; i < 11; i++) {
            sheet.getCell(`${alphabetList[(i * 2) + 1]}2`).style = {
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {argb: 'FFC7CE'},
                    bgColor: {argb: 'FFC7CE'}
                },
                font: {
                    color: {argb: "9C0006"}
                },
                border: {
                    bottom: {
                        style: "thin"
                    },
                    right: {
                        style: "thin"
                    }
                }
            }
            if (`${alphabetList[(i * 2)]}` === "D") {
                sheet.getCell(`${alphabetList[(i * 2)]}2`).style = {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'C6EFCE'},
                        bgColor: {argb: 'C6EFCE'}
                    },
                    font: {
                        color: {argb: "006100"}
                    },
                    border: {
                        left: {
                            style: "medium"
                        }, bottom: {
                            style: "thin"
                        }

                    }
                }
            } else {
                sheet.getCell(`${alphabetList[(i * 2)]}2`).style = {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'C6EFCE'},
                        bgColor: {argb: 'C6EFCE'}
                    },
                    font: {
                        color: {argb: "006100"}
                    },
                    border: {
                        bottom: {
                            style: "thin"
                        }
                    }
                }
            }
        }
        sheet.getColumnKey("datum").width = 18
        sheet.getColumnKey("ver").width = 5
        sheet.getColumnKey("namn").width = 25
        sheet.getColumnKey("ver").alignment = {horizontal: "center"}
        sheet.getColumnKey("datum").alignment = {horizontal: "left"}
        fixadatavisare()
        workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
                new Blob([buffer], {type: "application/octet-stream"}),
                `Bokföring NF ${new Date().toLocaleDateString()}.xlsx`
            );
        });
    }

    return (
        <>
            <span className={styles.FlexAndCenter}>
                    <button className={styles.FlexAndCenter} onClick={() => handleExport()}>
                        exportera till excel
                    </button>
                </span>
            <div className={styles.Padding1REM}>
                <h3 style={{marginBottom: "0"}}>senaste kvitton:</h3>
                {data.slice(0).reverse().map(({vara, pris,kategori, datum, swish, bild,typavköp}) => (
                    <div className={`${styles.parent}`} key={vara}>
                        <div className={styles.div6}>
                            <Link href={`/admin/${vara}/${swish}/${pris}`}>
                                <Image src={bild} alt={"bild på kvittot"} height={80} width={80}/>
                            </Link>
                        </div>
                        <div className={styles.div1}><p className={styles.fitText}>namn på {typavköp}: {vara} </p>
                        </div>
                        <div className={styles.div2}><p className={styles.fitText}>pris på {typavköp}: {pris}kr</p>
                        </div>
                        <div className={styles.div3}><p className={styles.fitText}>kategori på {typavköp}: {kategori}</p>
                        </div>
                        <div className={styles.div4}><p className={styles.fitText}>datum {typavköp}en skedde: {datum}</p>
                        </div>
                        <div className={styles.div5}><p className={styles.fitText}>swishnummer: {swish}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

