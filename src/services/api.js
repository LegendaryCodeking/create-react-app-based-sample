import http from "./httpService"
import config from "../config.json"


const routes = {
    description: {
        path: "/describe",
        method: "POST"
    },
    login: {
        path: "/login",
        method: "POST"
    },
    register: {
        path: "/register",
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
    }
}
const postDescription = async (requestObject) => {
    const { data } = await http.post(config.apiEndoint + routes.description.path, requestObject);
    return data;
}

let exports = { postDescription };

export default exports;