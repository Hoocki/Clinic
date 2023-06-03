import axios from "axios";

var token = "";
var doctor = JSON.parse(localStorage.getItem('doctor'));
if (doctor && doctor.accessToken) {
    token = doctor.accessToken;

}
export default axios.create({
    baseURL: "http://localhost:3000/api", // указание адреса сервера
    headers: {
        "Content-Type": "application/json", // обмен данными будем осуществлять в формате json
        "x-access-token":  token
    }
});