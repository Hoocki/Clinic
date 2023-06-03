<template>
    <div  style="padding:20px; width: 450px; font-size: 18px">
        <div v-if="this.journal">
            <h4>Запись</h4>      
                <form @submit="updateJournal" class="form-group">
                    <input type="text" name="description" id="description" required v-model="doctor.name" class="form-control" style="margin-top: 0px" disabled readonly>

                    <input type="text" name="description" id="description" required v-model="patient.name" class="form-control" style="margin-top: 10px" disabled readonly>

                    <input type="text" name="description" id="description" placeholder="Описание" required v-model="journal.description" class="form-control" style="margin-top: 10px">

                    <select name="status" id="status" class="form-select" required v-model="journal.status_id" style="margin-top: 10px">  
                        <option v-for="(elem, index) in statusElem" :key="index" v-bind:value="elem.id">
                            {{elem.name}}
                        </option>
                    </select> 

                    <input type="date" v-model="journal.date" class="form-control" style="margin-top: 10px">

                    <div class="container" style="margin-top: 10px">
                        <div class="row">  
                            <div class="col-3" style="margin-left: -12px">            
                                <button class="btn btn-primary" type="submit">Обновить</button>
                            </div>
                            <div class="col"> 
                                <button class="btn btn-danger" v-on:click="deleteJournal()">Удалить</button>
                            </div> 
                        </div>
                    </div>                
                </form>                          
        </div>
        <div v-else class="form-group" style="margin-top: 10px">
            <label for="status" class="alert alert-info" style="margin-top: 8px">Выберите запись</label>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "journal-details",
        props: ['id'],
        data() {
            return {
                journal: null,
                statusElem: [],
                doctor: null,
                patient: null
            };
        },
        methods: {
            getJournal() {
                http
                    .get("/journal/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.journal = response.data;
                        this.getDoctorData();
                        this.getPatientData();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateJournal(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    status_id: this.journal.status_id,                                      
                    description: this.journal.description,
                    date: this.journal.date
                };

                http
                    .post("/updateJournal/" + this.journal.id, data)
                    .then(() => {
                        this.$router.push('/listJournals'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        console.log(e);
                    });                
            },
            deleteJournal() {
                http
                    .post("/deleteJournal/" + this.journal.id)
                    .then(() => {
                        // переходим к списку пользователей (переход по ссылкам программно)
                        this.$router.push('/listJournals');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            statusFindAll() {                
                    http
                        .get("/statuses")
                        .then(response => {
                            this.statusElem = response.data;
                            //console.log(this.statusElem);
                        })
                        .catch(e => {
                            console.log(e);
                        });                
            },

            getDoctorData() {
                http
                    .get("/doctor/" + this.journal.doctor_id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.doctor = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getPatientData() {
                http
                    .get("/patient/" + this.journal.patient_id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.patient = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getJournal();
            this.statusFindAll();
        },             
    }
</script>

