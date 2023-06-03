import AuthService from '../services/auth.service';
const doctor = JSON.parse(localStorage.getItem('doctor'));
const initialState = doctor // состояния: авторизованный или неавторизованный пользователь
    ? { status: { loggedIn: true }, doctor }
    : { status: { loggedIn: false }, doctor: null };
export const auth = {
    namespaced: true,
    state: initialState,
    actions: { // действия: 1 - вход (login), 2 - выход (logout), 3 - регистрация (register)
        login({ commit }, doctor) {
            return AuthService.login(doctor).then(
                doctor => {
                    commit('loginSuccess', doctor);
                    return Promise.resolve(doctor);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, doctor) {
            return AuthService.register(doctor).then(
                response => {
                    commit('registerSuccess');
                    // Promise - объект, представляющий результат успешного или неудачного завершения операции.
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: { // Мутации. Позволяют изменять состояние хранилища во Vuex. Сохраняют данные пользователя в локальное хранилище в браузере. Также удаляют данные пользователя
        loginSuccess(state, doctor) {
            state.status.loggedIn = true;
            state.doctor = doctor;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.doctor = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.doctor = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};