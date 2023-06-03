<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <div v-if="displayContent">
            <router-link class="item" to="/addPatient">
                <button class="btn btn-primary" style="margin-left: -5px;">Добавить пациента</button>
            </router-link>

            <div class="form-group">
                <label for="name">Поиск пациента</label>
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="patient.name" class="form-control" style="margin-top: 4px">                    
                <div>
                    <button type="submit" v-on:click="searchPatient" value="Найти" class="btn btn-success" style="margin-top: 8px">Найти</button>
                </div>
            </div>  
            <div v-if="displayContent" style="margin-top: 10px">            
                <ul class="list-group">
                    <!-- Вывод списка пользователей -->
                    <li class="list-group-item" v-for="(patient, index) in patients" :key="index">
                        <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                        <!-- Ссылка на user определена в файле router.js -->
                        <!-- По маршруту user подгружается компонент User.vue -->
                        <!-- в params указываются параметры, которые передаютс компоненту-->
                        <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                        <router-link :to="{
                                name: 'patient-details',
                                params: { id: patient.id }
                            }" style="text-decoration: inherit; color: black">
                            {{(patient.name)}}
                        </router-link>
                    </li>
                </ul>
            </div> 
        </div>

        <div v-else class="alert alert-info" style="margin-top: 8px">
            Контент доступен только авторизованному доктору
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import DoctorService from '../../services/doctor.service';
    export default {
        name: "ListPatients", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                patient: {
                    id: 0,                    
                    name: '',
                    phone_number: ""                    
                },
                patients: [],
                displayContent: false // по умолчанию скрываем контент
            };
        },
        methods: { // методы компонента
            getPatients() {
                http
                    .get("/patients") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.patients = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            searchPatient() {
                if (this.patient.name != "") {                                                                            
                http
                    .get("/patient/name/" + this.patient.name) // обращаемся к серверу для получения пациента по имени
                    .then(response => { // запрос выполнен успешно
                        //console.log(this.patient);
                        this.patient = response.data;
                        if (this.patient.id == null){
                            this.$router.push("/patient/" + this.patient.id);
                        }
                        this.$router.push("/patient/" + this.patient[0].id); // переходим к списку пациентов
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
                }
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            DoctorService.getDoctorBoard()
            .then(() => {
                this.displayContent = true;
            })
            .catch(e => {
                this.content =
                    (e.response && e.response.data) ||
                    e.message ||
                    e.toString();
                }
            );
            this.getPatients();
            this.searchPatient();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>