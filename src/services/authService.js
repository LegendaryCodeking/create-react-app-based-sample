import jwtDecode from "jwt-decode";

function getCurrentUser() {

    try {
        const token = localStorage.getItem("token");
        let user = jwtDecode(token)
        let userObject = {
            id: user.id,
            exp: user.exp,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            date_of_birth: user.date_of_birth,
            email: user.email,
            company_name: user.company_name,
            company_email: user.company_email,
            company_designation: user.company_designation,
            company_location: user.company_location,
            total_customers: user.total_customers,
            total_amount_disbursed: user.total_amount_disbursed
        }

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