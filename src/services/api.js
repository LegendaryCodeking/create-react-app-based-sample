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
        path: "/predictdatachecker/",
        method: "GET"
    },
    mlpredict: {
        path: "/datapredict/",
        method: "POST"
    },
    updateProfile: {
        path: "/profileupdate/",
        method: "PUT"
    },
    initiateModelling: {
        path: "/predictinitiate/",
        method: "GET"
    }
}

/* let config = {
    headers: {
        Authorization: "Token " + localStorage.getItem('token')
    }
} */
const postDescription = async (requestObject) => {
    const response = await http.post(url + routes.description.path, requestObject);
    return response;
}

const postDistributionChanged = async (requestObject) => {
    const response = await http.post(url + routes.changeDistribution.path, requestObject);
    return response;
}

const getPrediction = async () => {
    const response = await http.get(url + routes.predict.path);
    return response;
}

const initiateModelling = async () => {
    const response = await http.get(url + routes.initiateModelling.path);
    return response;
}

const postForPrediction = async (uploadData) => {
    const response = await http.post(url + routes.mlpredict.path, uploadData);
    return response;
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

const postProfileUpdate = async (userData) => {
    console.log('updating profile data: ', userData);
    const response = await http.put(url + routes.updateProfile.path, userData);
    return response;
}


let exports = {
    postDescription,
    postDistributionChanged,
    getPrediction,
    postForPrediction,
    postLogin,
    postRegister,
    postUploadData,
    postProfileUpdate,
    initiateModelling
};

export default exports;