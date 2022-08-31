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

const exportParameters = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}
export default exportParameters;