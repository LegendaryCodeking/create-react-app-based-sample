import axios from "axios";
import logger from "./logService"
import { toast } from "react-toastify"
axios.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response >= 400 && error.response <= 500;

    if (!expectedErrors) {
        logger.log(error)
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