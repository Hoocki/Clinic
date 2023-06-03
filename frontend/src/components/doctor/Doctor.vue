<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <div v-if="this.doctor"> 
            <h4>Доктор</h4>      
            <ul class="list-group">
                <li type="text" id="name" class="list-group-item">
                    {{doctor.name}}
                </li>
                <li type="text" id="phone_number" class="list-group-item">
                    {{doctor.phone_number}}
                </li>
                <li type="text" id="specialization" class="list-group-item">
                    {{specializationElem.name}}
                </li>                         
            </ul>                       
        </div>
        <div v-else>
            <label class="alert alert-info" role="alert">Неверное имя доктора</label>
        </div>
        <div style="margin-top: 10px">
            <router-link to="/listDoctors">
                <button class="btn btn-success">Вернуться к списку докторов </button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "doctor-details",
        props: ['id'],
        data() {
            return {
                doctor: null,
                specializationElem: null
            };
        },
        methods: {
            getDoctor() {
                http
                    .get("/doctor/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.doctor = response.data;
                        this.getSpecialization();                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getSpecialization() {                
                http
                    .get("/specialization/" + this.doctor.specialization_id)
                    .then(response => {
                        this.specializationElem = response.data;
                        //console.log(this.specializationElem);
                    })
                    .catch(e => {
                        console.log(e);
                    });                
            }
        },
        mounted() { // загружаем данные пользователя
            this.getDoctor();            
        },             
    }
</script>

