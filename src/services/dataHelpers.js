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

function getBinarySums(data) {
    let binaries = [0, 1]
    let finalArray = [{ variable: 0, amount: 0 }, { variable: 1, amount: 0 }];

    if (data) {
        binaries.forEach((binary) => {
            data.forEach((object) => {
                finalArray[binary] = { variable: binary, amount: finalArray[binary].amount + object[binary] }
            })
        })

        return finalArray;
    } else {
        return [];
    }
}

function FormatDistroData(data, variable) {
    let distroData = data.result_variable_distribution;
    let keys = Object.keys(distroData);
    //let keysLength = keys.length;
    //let frequencyData = distroData['Frequency'];
    let objectsLength = Object.keys(distroData[keys[0]]).length;
    let finalArray = []

    for (let index = 0; index < objectsLength; index++) {
        let pushObject = {}
        keys.forEach((key, index2) => {
            pushObject[key] = distroData[key][index]
        })
        finalArray.push(pushObject);
    }

    console.log('finalArray: ', finalArray);

    let headers = {};
    headers.y = 'Frequency';
    headers.z = variable;
    headers.x = keys.filter((key) => {
        if (key !== 'Frequency' && key !== 'Loan Status') {
            return true;
        } else {
            return false;
        }
    })[0]

    return {
        rowData: finalArray,
        columnData: headers
    };

}

function formatBarchartDistributionData(data, variable) {
    let strippedArray = [];

    data.forEach((object) => {
        strippedArray.push({
            x: object['Loan Status'],
            Frequency: object['Frequency']
        })
    })

    //strippedArray
    let result = []

    strippedArray.forEach(function (a) {
        if (!this[a.x]) {
            this[a.x] = { x: a.x, Frequency: 0 };
            result.push(this[a.x]);
        }
        this[a.x].Frequency += a.Frequency;
    }, Object.create(null));

    console.log(result);
    console.log('strippedArray: ', strippedArray);
    return result;
}

function formatPieChartDistributionData(data) {
    let strippedArray = [];

    data.forEach((object) => {
        strippedArray.push({
            x: object['Loan Status'],
            y: object['Frequency']
        })
    })

    //strippedArray
    let result = []

    strippedArray.forEach(function (a) {
        if (!this[a.x]) {
            this[a.x] = { x: a.x, y: 0 };
            result.push(this[a.x]);
        }
        this[a.x].y += a.y;
    }, Object.create(null));

    console.log(result);
    console.log('strippedArray: ', strippedArray);
    return result;
};


function formatPerformanceMetricTableData(data) {
    let metrics = data.metrics_table;
    let metricColumns = metrics.columns;
    let metricValues = metrics.values;
    //let dataLength = metricColumns.length;
    let valueLength = metricValues[0].length;
    let flattenedArray = []



    for (let index = 0; index < valueLength; index++) {
        let metricObject = {}
        metricColumns.forEach((column, index2) => {
            metricObject[column] = metricValues[index2][index]
        })
        flattenedArray.push(metricObject)
    }

    let columns = []
    metricColumns.forEach((column) => {
        let headerName = humanizeText(column)
        if (column === 'Class_ID') {
            columns.push({
                field: column,
                pinned: 'left',
                lockPinned: true,
                headerName: headerName
            })
        } else {
            columns.push({
                field: column,
                headerName: headerName,
                filter: true
            })
        }
    })

    return {
        columnData: columns,
        rowData: flattenedArray
    };
}


function humanizeText(str) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}

function formatROCData(data) {
    console.log('plumber ROC data: ', data);
    let ROCData = data.area_under_curve;
    let falsePositiveRate = ROCData.false_positive_rate;
    let truePositiveRate = ROCData.true_positive_rate;
    let thresholds = ROCData.thresholds;
    let valueLength = falsePositiveRate.length;

    let givenArray = [];

    for (let index = 0; index < valueLength; index++) {
        let valueObject = {}
        valueObject['false_positive'] = falsePositiveRate[index];
        valueObject['true_positive'] = truePositiveRate[index];
        valueObject['threshold'] = thresholds[index];
        givenArray.push(valueObject);
    }

    return givenArray;
}

const exportvariables = {
    getDataHeaders,
    formatDataSummaryData,
    getBinarySums,
    FormatDistroData,
    formatBarchartDistributionData,
    formatPieChartDistributionData,
    formatPerformanceMetricTableData,
    formatROCData
}


export default exportvariables;