import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListJournals from "./components/journal/ListJournals";
import Journal from "./components/journal/Journal";
import AddJournal from "./components/journal/AddJournal";

import ListDoctors from "./components/doctor/ListDoctors";
import Doctor from "./components/doctor/Doctor";

import ListPatients from "./components/patient/ListPatients";
import Patient from "./components/patient/Patient";
import AddPatient from "./components/patient/AddPatient";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

// определяем маршруты
const routes = [
    {
        path: "/login",
        name: "login-doctor",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-doctor",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-doctor",
        component: Profile,
        meta: {
            title: "Профиль доктора"
        }
    },
    {
        path: "/listJournals", // указание маршрута, по которому будем переходить к списку записей
        name: "journals", // имя маршрута
        alias: "/journals", // указание дополнительного маршрута
        component: ListJournals, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список записей"
        }
    },    
    {
        path: "/journal/:id",
        name: "journal-details",
        component: Journal,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные о записи"
        }
    },
    {
        path: "/addJournal",
        name: "add-journal",
        component: AddJournal,
        meta: {
            title: "Добавление записи"
        }
    },
    {
        path: "/listDoctors", // указание маршрута, по которому будем переходить к списку записей
        name: "doctors", // имя маршрута
        alias: "/doctors", // указание дополнительного маршрута
        component: ListDoctors, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список докторов"
        }
    },
    {
        path: "/doctor/:id",
        name: "doctor-details",
        component: Doctor,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные о докторе"
        }
    },
    {
        path: "/listPatients", // указание маршрута, по которому будем переходить к списку записей
        name: "patients", // имя маршрута
        alias: "/patients", // указание дополнительного маршрута
        component: ListPatients, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пациентов"
        }
    },
    {
        path: "/patient/:id",
        name: "patient-details",
        component: Patient,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные о пациентов"
        }
    },
    {
        path: "/addPatient",
        name: "add-patient",
        component: AddPatient,
        meta: {
            title: "Добавление пациента"
        }
    },          
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;