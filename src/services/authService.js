import jwtDecode from "jwt-decode";

function getCurrentUser() {
    console.log("extracting user");
    try {
        const token = localStorage.getItem("token");
        let user = jwtDecode(token)
        let userObject = {
            company_email: user.company_email,
            company_name: user.company_email,
            exp: user.exp,
            first_name: user.first_name,
            id: user.id,
            last_name: user.last_name,
            personal_email: user.personal_email,
            username: user.username
        }
        console.log('user: ', userObject);
        return userObject;
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