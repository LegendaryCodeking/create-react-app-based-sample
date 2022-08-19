

function getDataHeaders(data) {
    console.log('data: ', data);
    return Object.keys(data[0]);
}

function formatDataSummaryData(data) {
    console.log('data: ', data);

}


const exportvariables = { getDataHeaders, formatDataSummaryData }

export default exportvariables;