import http from "./httpService"
//import config from "../config.json"

let server_url = process.env.REACT_APP_SERVER_URL;
let url = server_url
const routes = {
    description: {
        path: "/describe/",
        method: "POST"
    },
    upload: {
        path: "/upload/",
        method: "POST"
    },
    changeDistribution: {
        path: "/changedistribution/",
        method: "POST"
    },
    login: {
        path: "/login/",
        method: "POST"
    },
    register: {
        path: "/register/",
        method: "POST"
    },
    data_upload: {
        path: "/upload",
        method: "POST"
    },
    land: {
        path: "/land",
        method: "GET"
    },
    logout: {
        path: "/logout",
        method: "POST"
    },
    predict: {
        path: "/predict",
        method: "GET"
    },
    mlpredict: {
        path: "/datapredict",
        method: "POST"
    }
}

/* let config = {
    headers: {
        Authorization: "Token " + localStorage.getItem('token')
    }
} */
const postDescription = async (requestObject) => {
    const { data } = await http.post(url + routes.description.path, requestObject);
    return data;
}

const postDistributionChanged = async (requestObject) => {
    const response = await http.post(url + routes.changeDistribution.path, requestObject);
    return response;
}

const getPrediction = async () => {
    const { data } = await http.get(url + routes.predict.path);
    return data;
}

const postForPrediction = async (uploadData) => {
    const { data } = await http.post(url + routes.mlpredict.path, uploadData);
    return data;
}

const postLogin = async (user) => {
    const response = await http.post(url + routes.login.path, user);
    return response;
}

const postRegister = async (user) => {
    const response = await http.post(url + routes.register.path, user);
    return response;
}

const postUploadData = async (uploadData) => {
    console.log('uploading file data: ', uploadData);
    const response = await http.post(url + routes.upload.path, uploadData);
    return response;
}

let exports = { postDescription, postDistributionChanged, getPrediction, postForPrediction, postLogin, postRegister, postUploadData };

export default exports;