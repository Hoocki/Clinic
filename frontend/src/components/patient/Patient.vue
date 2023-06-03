<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <div v-if="this.patient">
            <h4>Пациент</h4>        
            <form @submit="updatePatient" class="form-group">
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="patient.name" class="form-control" style="margin-top: 10px">
                <input type="text" name="phone_number" id="phone_number" placeholder="Телефон" required v-model="patient.phone_number" class="form-control" style="margin-top: 10px">
                <div class="container" style="margin-top: 10px">
                    <div class="row">
                        <div class="col-4" style="margin-left: -12px">
                            <button class="btn btn-primary" type="submit" >Обновить</button>
                        </div>
                        <div class="col" style="margin-left: 0px">
                            <button class="btn btn-danger" v-on:click="deletePatient()">Удалить</button>
                        </div>                        
                    </div>
                </div>
            </form>

            <button class="btn btn-primary" v-on:click="getJournals()" style="margin-top: 10px">Показать записи пациента</button>

            <ul class="list-group" style="margin-top: 10px;">
                    <li  class="list-group-item" v-for="(patientElem, index) in patient_journals" :key="index">                                   
                        <router-link :to="{
                                name: 'journal-details',
                                params: { id: patientElem.id }
                            }" style="text-decoration: inherit; color: black">
                            {{(patientElem.description)}} на дату {{(patientElem.date)}}, пациент {{(patientElem.name)}} к доктору {{patientElem.doctor.name}}
                        </router-link>                                         
                    </li>
            </ul>                              
        </div>
        <div v-else style="margin-top: 0px">
             <label class="alert alert-info" role="alert">Неверное имя пациента</label>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "patient-details",
        props: ['id'],
        data() {
            return {
                patient: null,
                patient_journals: []
            };
        },
        methods: {
            getPatient() {
                http
                    .get("/patient/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.patient = response.data;
                        //this.getJournals()
                        //console.log(this.patient.id)
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updatePatient(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.patient.name,                                      
                    phone_number: this.patient.phone_number                    
                };

                http
                    .post("/updatePatient/" + this.patient.id, data)
                    .then(() => {
                        this.$router.push('/listPatients'); // переходим к списку пациентов
                    })
                    .catch(e => {
                        console.log(e);
                    });                
            },
            deletePatient() {
                http
                    .post("/deletePatient/" + this.patient.id)
                    .then(() => {
                        // переходим к списку пациентов (переход по ссылкам программно)
                        this.$router.push('/listPatients');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getJournals() {
                http                
                    .get("/journalsForPatient/" + this.patient.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.patient_journals = response.data;
                        console.log(this.patient_journals);
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пациента
            this.getPatient();                   
        }             
    }
</script>

