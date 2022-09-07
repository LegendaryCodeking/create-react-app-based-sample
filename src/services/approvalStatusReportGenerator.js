import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generateApprovalStatusReport = async (data) => {
    // initialize jsPDF
    const doc = new jsPDF("l", "mm", "letter");
    let headers = data.headers;
    let rows = data.data;
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
    doc.setTextColor('#000b18')
    doc.text("Approval status", 130, 15, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont("Times", "Roman")
    doc.text("This is a summary of approved states", 130, 25, { align: 'center' });

    // startY is basically margin-top
    doc.autoTable({
        columns: tableColumns,
        body: tableRows,
        startY: 40,
        styles: { cellWidth: 80, overflow: 'linebreak' },
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

            console.log("column", data.column)
        }
    });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left

    // we define the name of our PDF file.
    await doc.save(`report_${dateStr}.pdf`, { returnPromise: true });
    console.log("done");
};

export default generateApprovalStatusReport;