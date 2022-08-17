import jwtDecode from "jwt-decode";

function getCurrentUser() {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

function logout() {
    localStorage.removeItem("token")
}

function userLoggedIn() {
    try {
        const token = localStorage.getItem("token");
        const tokenExists = token !== " " ? true : false
        return tokenExists;
    } catch (error) {
        return false;
    }
}

function logIn(token) {
    localStorage.setItem("token", token)
}

let exports = { getCurrentUser, logout, logIn, userLoggedIn }
export default exports;