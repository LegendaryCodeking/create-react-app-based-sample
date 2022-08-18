

function getDataHeaders(data) {
    console.log('data: ', data);
    return Object.keys(data[0]);
}


const exportvariables = { getDataHeaders }

export default exportvariables;