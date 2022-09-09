import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = async (data, user) => {
    // initialize jsPDF
    const doc = new jsPDF("l", "mm", "letter");

    doc.setFontSize(18)
    //console.log(doc.getFontList())
    doc.setFont("Times", "bold")
    doc.setTextColor('#226bab')
    doc.text("AICE CREDIT SCORING TOOL [FULL REPORT]", 130, 80, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor('#01234d')
    doc.setFont("Times", "bold")
    doc.text("This is a complete summary of all available steps through Caspre.", 130, 100, { align: 'center' });
    doc.text("This representation will only contain steps that have been successfully processed.", 130, 110, { align: 'center' });

    let pageActualNumber = 0;
    //doc.addPage();
    if (data.summaryReportData) {
        doc.addPage()
        let summaryData = data.summaryReportData;
        let headers = summaryData.headers;
        let rows = summaryData.data;
        //const margin = 6;
        //const pageHeight = 215.9;
        //headers[0] = 'Columns'

        const fromIndex = headers.indexOf('Columns'); // 👉️ 0
        const toIndex = 0;

        const element = headers.splice(fromIndex, 1)[0];
        console.log(element); // ['css']

        headers.splice(toIndex, 0, element);

        // define the columns we want and their titles
        const tableColumns = headers;
        // define an empty array of rows
        const tableRows = [];

        // for each ticket pass all its data into an array
        rows.forEach(row => {

            const ticketData = []
            headers.forEach((header, index) => {
                ticketData.push(row[headers[index]])
            })

            // push each tickcet's info into a row
            tableRows.push(ticketData);
        });

        doc.setFontSize(12)
        //console.log(doc.getFontList())
        doc.setFont("Times", "bold")
        doc.setTextColor('#226bab')
        doc.text("SUMMARY REPORT", 130, 15, { align: 'center' });
        doc.setFontSize(8);
        doc.setTextColor('#000b18')
        doc.setFont("Times", "Roman")
        doc.text("This is a summary of your provided data uploaded as a file in step 1.", 130, 25, { align: 'center' });
        doc.text("This representation does not include any analyzed data.", 130, 30, { align: 'center' });

        // startY is basically margin-top
        doc.autoTable({
            columns: tableColumns,
            body: tableRows,
            startY: 40,
            styles: { cellWidth: 40, overflow: 'linebreak' },
            pageBreak: 'auto',
            horizontalPageBreak: true,
            columnStyles: { 1: { cellWidth: 40 } },
            didParseCell: (data) => {
                let specialCellArray = [
                    "Column",
                    "count",
                    "top",
                    "freq",
                    "mean",
                    "std",
                    "min",
                    "25%",
                    "50%",
                    "75%",
                    "max",
                    "Unique Count",
                    "# Missing"
                ]
                let cellData = data.cell.text[0];
                //console.log('cellData: ', cellData);
                if (specialCellArray.includes(cellData)) {
                    //console.log(data.cell);
                    data.cell.styles.fillColor = '#226bab'
                    data.cell.styles.textColor = '#fff'
                    data.cell.styles.fontStyle = 'bold'
                    //data.cell.styles.halign = 'center'
                    data.cell.styles.cellWidth = 40
                    data.cell.width = 40
                    data.cell.minWidth = 40
                    //console.log('data.cell.styles: ', data.cell.styles);
                }

                //console.log("column", data.column)
            },
            didDrawPage: (data) => {
                console.log('page data: ', data);
                //let pageNumber = data.pageNumber;
                doc.setFont("Courier", "Bold")
                doc.setTextColor('#226bab')
                pageActualNumber = pageActualNumber + 1;
                doc.text("Page " + pageActualNumber, 130, 200);
            }
        });
    }
    if (data.approvalData) {
        doc.addPage()
        let approvalData = data.approvalData;

        let headers = approvalData.headers;
        let rows = approvalData.data;
        //const margin = 6;
        //const pageHeight = 215.9;
        //headers[0] = 'Columns'

        const fromIndex = headers.indexOf('Number'); // 👉️ 0
        const toIndex = 0;

        const element = headers.splice(fromIndex, 1)[0];
        console.log(element); // ['css']

        headers.splice(toIndex, 0, element);

        // define the columns we want and their titles
        const tableColumns = headers;
        // define an empty array of rows
        const tableRows = [];

        // for each ticket pass all its data into an array
        rows.forEach(row => {

            const ticketData = []
            headers.forEach((header, index) => {
                ticketData.push(row[headers[index]])
            })

            // push each tickcet's info into a row
            tableRows.push(ticketData);
        });

        doc.setFontSize(12)
        console.log(doc.getFontList())
        doc.setFont("Times", "bold")
        doc.setTextColor('#226bab')
        doc.setFontSize(12);
        doc.text("APPROVAL STATUS REPORT", 130, 15, { align: 'center' });
        doc.setFontSize(8);
        doc.setTextColor('#000b18')
        doc.setFont("Times", "Roman")
        doc.text("This reports includes analysis of status of approval from your provided data.", 130, 25, { align: 'center' });
        doc.text("This representation includes analyzed data.", 130, 30, { align: 'center' });

        // startY is basically margin-top
        doc.autoTable({
            columns: tableColumns,
            body: tableRows,
            startY: 40,
            styles: { cellWidth: 40, overflow: 'linebreak' },
            pageBreak: 'auto',
            horizontalPageBreak: true,
            columnStyles: { 1: { cellWidth: 40 } },
            didParseCell: (data) => {
                let specialCellArray = [
                    "Column",
                    "count",
                    "top",
                    "freq",
                    "mean",
                    "std",
                    "min",
                    "25%",
                    "50%",
                    "75%",
                    "max",
                    "Unique Count",
                    "# Missing"
                ]
                let cellData = data.cell.text[0];
                //console.log('cellData: ', cellData);
                if (specialCellArray.includes(cellData)) {
                    //console.log(data.cell);
                    data.cell.styles.fillColor = '#226bab'
                    data.cell.styles.textColor = '#fff'
                    data.cell.styles.fontStyle = 'bold'
                    //data.cell.styles.halign = 'center'
                    /* data.cell.styles.cellWidth = 40
                    data.cell.width = 40
                    data.cell.minWidth = 40 */
                    //console.log('data.cell.styles: ', data.cell.styles);
                }

                if (cellData === 'Rejected') {
                    data.cell.styles.textColor = '#ed0505'
                    data.cell.styles.fontStyle = 'bold'
                }
                if (cellData === 'Approved') {
                    data.cell.styles.textColor = '#28ed05'
                    data.cell.styles.fontStyle = 'bold'
                }

                console.log("column", data.column)
            },
            didDrawPage: (data) => {
                console.log('page data: ', data);
                //let pageNumber = data.pageNumber;
                doc.setFont("Courier", "Bold")
                doc.setTextColor('#226bab')
                pageActualNumber = pageActualNumber + 1;
                doc.text("Page " + pageActualNumber, 130, 205);
            }
        });
    }

    if (data.mlStats) {
        doc.addPage()
        let mlStatsData = data.mlStats;

        let headers = mlStatsData.headers;
        let rows = mlStatsData.data;
        //const margin = 6;
        //const pageHeight = 215.9;
        //headers[0] = 'Columns'

        const fromIndex = headers.indexOf('Class_ID'); // 👉️ 0
        const toIndex = 0;

        const element = headers.splice(fromIndex, 1)[0];
        console.log(element); // ['css']

        headers.splice(toIndex, 0, element);

        // define the columns we want and their titles
        const tableColumns = headers;
        // define an empty array of rows
        const tableRows = [];

        // for each ticket pass all its data into an array
        rows.forEach(row => {

            const ticketData = []
            headers.forEach((header, index) => {
                ticketData.push(row[headers[index]])
            })

            // push each tickcet's info into a row
            tableRows.push(ticketData);
        });

        doc.setFontSize(12)
        console.log(doc.getFontList())
        doc.setFont("Times", "bold")
        doc.setTextColor('#226bab')
        doc.setFontSize(12);
        doc.text("ML STATISTICS REPORT", 130, 15, { align: 'center' });
        doc.setFontSize(8);
        doc.setTextColor('#000b18')
        doc.setFont("Times", "Roman")
        doc.text("This reports includes a brief overvie of the machine learning model trained by your data.", 130, 25, { align: 'center' });
        //doc.text("This representation includes.", 130, 30, { align: 'center' });

        // startY is basically margin-top
        doc.autoTable({
            columns: tableColumns,
            body: tableRows,
            startY: 40,
            styles: { cellWidth: 50, overflow: 'linebreak' },
            pageBreak: 'auto',
            horizontalPageBreak: true,
            columnStyles: { 1: { cellWidth: 40 } },
            didParseCell: (data) => {
                var rows = data.table.body;
                if (data.row.index === rows.length - 1) {
                    data.cell.styles.fillColor = '#226bab';
                    data.cell.styles.textColor = '#fff'
                    data.cell.styles.fontStyle = 'bold'
                }
                /* let specialCellArray = [
                    "Column",
                    "count",
                    "top",
                    "freq",
                    "mean",
                    "std",
                    "min",
                    "25%",
                    "50%",
                    "75%",
                    "max",
                    "Unique Count",
                    "# Missing"
                ]
                let cellData = data.cell.text[0];
                //console.log('cellData: ', cellData);
                if (specialCellArray.includes(cellData)) {
                    //console.log(data.cell);
                    data.cell.styles.fillColor = '#226bab'
                    data.cell.styles.textColor = '#fff'
                    data.cell.styles.fontStyle = 'bold'
                    //data.cell.styles.halign = 'center'
                    data.cell.styles.cellWidth = 40
                    data.cell.width = 40
                    data.cell.minWidth = 40
                    //console.log('data.cell.styles: ', data.cell.styles);
                }
    
                console.log("column", data.column) */
            },
            didDrawPage: (data) => {
                console.log('page data: ', data);
                //let pageNumber = data.pageNumber;
                doc.setFont("Courier", "Bold")
                doc.setTextColor('#226bab')
                pageActualNumber = pageActualNumber + 1;
                doc.text("Page " + pageActualNumber, 130, 200);
            }
        });

    }



    const date = Date().split(" ");


    doc.addPage()

    let metaHeader = ['Detail', 'Description'];
    let metaRows = [
        ['Generated by', user.username],
        ['Generated On', date[0] + ', ' + date[1] + ' ' + date[2] + ', ' + date[3]],
        ['Time', date[4]]
    ]



    doc.autoTable({
        columns: metaHeader,
        body: metaRows,
        startY: 40,
        styles: { cellWidth: 50, overflow: 'linebreak' },
        pageBreak: 'auto',
        horizontalPageBreak: true,
        columnStyles: { 1: { cellWidth: 40 } },
    })
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left

    // we define the name of our PDF file.
    /* const pageCount = doc.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
        doc.text(String(i), 196, 285);
    } */

    await doc.save(`Caspre Full Report - ${dateStr}.pdf`, { returnPromise: true });
    console.log("done");
};

export default generatePDF;