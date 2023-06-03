import http from "../http-common";

function login(doctor) {
    var data = {
        mail: doctor.mail,
        password: doctor.password
    };
    return http
            .post("/login", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('doctor', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
            }
            return response.data;
        });

}

function logout() {
    localStorage.removeItem('doctor'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

function register(doctor) {
    var data = {
        name: doctor.name,
        specialization_id: doctor.specialization_id,
        phone_number: doctor.phone_number,        
        mail: doctor.mail,
        password: doctor.password
    };
    return http.post("/register", data);
}

export default {
    login: login,
    logout: logout,
    register: register
};