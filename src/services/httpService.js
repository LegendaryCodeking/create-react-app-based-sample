import axios from "axios";
import logger from "./logService"
import { toast } from "react-toastify"

let log_url = process.env.REACT_APP_LOG_URL;
axios.interceptors.response.use(null, error => {
    console.log('API error: ', error);
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500 && error.response.status !== 404;
    console.log('expectedErrors: ', expectedErrors);

    if (!expectedErrors && error.config.url !== log_url + '/v1/products/newlogin/') {
        toast.error("An unexpected error occured")
        logger.log('unexpected error', error)
    }
    return Promise.reject(error);
})

axios.interceptors.request.use((config) => {
    console.log('config: ', config);
    let requestURL = config.url;
    let loginURL = process.env.REACT_APP_SERVER_URL + '/login/';
    let registerURL = process.env.REACT_APP_SERVER_URL + '/register/';
    config.rejectUnauthorized = false
    config.strictSSL = false
    config.agent = false
    config.requestCert = true

    if (requestURL !== loginURL && requestURL !== registerURL) {
        //console.log("unexpected error");
        config.headers['Authorization'] = 'Token ' + getTokenIfExists();
    }
    return config;
}, (error) => {
    console.log('error: ', error);
    return Promise.reject(error);
})

const getTokenIfExists = () => {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "";
    return token;
}

const exportParameters = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}
export default exportParameters;