//import * as d3 from "d3"
//import { keys } from "d3-collection";

function getDataHeaders(data) {

    return Object.keys(data[0]);
}

function formatDataSummaryData(data) {

    let actual = data.result_summary;

    let data_Headers = Object.keys(actual);

    //let propertyCount = Object.keys(actual[data_Headers[0]]).length;
    let electedHeaders = Object.values(actual['Column'])

    //let i = 0;
    let finalArray = []

    /* for (let index = 0; index < propertyCount + 1; index++) {
        
    } */


    data_Headers.forEach((header) => {
        let dataObject = {}
        electedHeaders.forEach((eHeaders, index) => {
            if (eHeaders === actual[header][index]) {

            } else {
                dataObject[eHeaders] = actual[header][index];
                dataObject.Columns = header;
            }
        })
        finalArray.push(dataObject)
    })




    electedHeaders = [...electedHeaders, "Columns"];

    finalArray = finalArray.filter(element => {
        if (Object.keys(element).length !== 0) {
            return true;
        }

        return false;
    });

    return { headers: electedHeaders, data: finalArray }
}


const exportvariables = { getDataHeaders, formatDataSummaryData }

export default exportvariables;