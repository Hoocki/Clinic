<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <div v-if="displayContent">
            <label for="name">Поиск доктора</label>
            <input type="text" name="name" id="name" placeholder="ФИО" required v-model="doctor.name" class="form-control" style="margin-top: 4px">                                                               
            <button type="submit" v-on:click="searchDoctor" value="Найти" class="btn btn-success" style="margin-top: 8px">Найти</button>   
        </div>

        <div v-if="displayContent" style="margin-top: 10px">
            <ul class="list-group">
                <!-- Вывод списка пользователей -->
                <li class="list-group-item" v-for="(doctor, index) in doctors" :key="index">
                    <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                    <!-- Ссылка на user определена в файле router.js -->
                    <!-- По маршруту user подгружается компонент User.vue -->
                    <!-- в params указываются параметры, которые передаютс компоненту-->
                    <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                    <router-link :to="{
                            name: 'doctor-details',
                            params: { id: doctor.id }
                        }" style="text-decoration: inherit; color: black">
                        {{(doctor.name)}}
                    </router-link>
                </li>
            </ul>                                                             
        </div>
        <div v-else  class="alert alert-info" style="margin-top: 8px">
            Контент доступен только авторизованному доктору
        </div>                                      
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import DoctorService from '../../services/doctor.service';
    export default {
        name: "ListDoctors", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                doctor: {
                    id: 0,                    
                    name: '',
                    phone_number: "",
                    specialization_id: 0
                },
                doctors: [],
                displayContent: false // по умолчанию скрываем контент
            };
        },
        methods: { // методы компонента
            getDoctors() {
                http
                    .get("/doctors") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.doctors = response.data;                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            searchDoctor() {
                if (this.doctor.name != "") {                                                                            
                http
                    .get("/doctor/name/" + this.doctor.name) // обращаемся к серверу для получения доктора по имени
                    .then(response => { // запрос выполнен успешно
                        //console.log(this.doctor);
                        this.doctor = response.data;
                        //console.log(this.doctor.id);
                        if (this.doctor.id == null){
                            this.$router.push("/doctor/" + this.doctor.id);
                        }
                        this.$router.push("/doctor/" + this.doctor[0].id); // переходим к списку докторов
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
            this.getDoctors();
            this.searchDoctor();            
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>