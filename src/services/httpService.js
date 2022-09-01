import axios from "axios";
import logger from "./logService"
import { toast } from "react-toastify"
axios.interceptors.response.use(null, error => {
    console.log('API error: ', error);
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status <= 500 && error.response.status !== 404;
    console.log('expectedErrors: ', expectedErrors);

    if (!expectedErrors) {
        logger.log('unexpected error', error)
        toast.error("An unexpected error occured")
    }
    return Promise.reject(error);
})

axios.interceptors.request.use((config) => {
    console.log('config: ', config);
    let requestURL = config.url;
    let loginURL = process.env.REACT_APP_SERVER_URL + '/login/';
    let registerURL = process.env.REACT_APP_SERVER_URL + '/register/';

    if (requestURL !== loginURL && requestURL !== registerURL) {
        console.log("not login");
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