import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (data) => {
    // initialize jsPDF
    const doc = new jsPDF('letter');
    let headers = data.headers.slice(1, 5);
    let rows = data.data;
    headers[0] = 'Columns'

    // define the columns we want and their titles
    const tableColumn = headers;
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    rows.forEach(row => {
        const ticketData = [
            row[headers[0]],
            row[headers[1]],
            row[headers[2]],
            row[headers[3]],
            row[headers[4]],
            // called date-fns to format the date on the ticket
            //format(new Date(ticket.updated_at), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(ticketData);
    });


    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 40 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.setFontSize(12)
    console.log(doc.getFontList())
    doc.setFont("Times", "bold")
    doc.setTextColor('#000b18')
    doc.text("Closed tickets within the last one month.", 105, 15, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont("Times", "Roman")
    doc.text("This is a summary of your provided data uploaded as a file in step 1.", 105, 25, { align: 'center' });
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;