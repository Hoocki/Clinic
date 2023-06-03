<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <h4>Добавление записи</h4>        
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addUser определён в script-->
            <form class="form-group" @submit="addJournal" style="margin-top: 2px">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                    <label for="date" class="form-group" style="margin-top: 10px">Статус</label>
                    <select name="status" id="status" class="form-select" required v-model="journal.status_id"  style="margin-top: 4px">  
                        <option v-for="(elem_status, index) in statusElem" :key="index" v-bind:value="elem_status.id">
                            {{elem_status.name}}
                        </option>
                    </select> 

                    <label for="date" class="form-group" style="margin-top: 10px">Лечащий врач</label>
                    <select name="doctor" id="doctor" class="form-select" required v-model="journal.doctor_id"  style="margin-top: 4px">  
                        <option v-for="(elem_doctor, index) in doctorElem" :key="index" v-bind:value="elem_doctor.id">
                            {{elem_doctor.name}}
                        </option>
                    </select> 

                    <label for="date" class="form-group" style="margin-top: 10px">Пациент</label>
                    <select name="patient" id="patient" class="form-select" required v-model="journal.patient_id"  style="margin-top: 4px">  
                        <option v-for="(elem_patient, index) in patientElem" :key="index" v-bind:value="elem_patient.id">
                            {{elem_patient.name}}
                        </option>
                    </select> 

                <label for="date" class="form-group" style="margin-top: 10px">Дата</label>
                <input type="date" v-model="journal.date" class="form-control" style="margin-top: 4px">

                <input type="text" name="description" id="description" placeholder="Описание" required v-model="journal.description" class="form-control" style="margin-top: 10px"> 

                <button class="btn btn-primary" style="margin-top:10px" type="submit">Добавить</button>
            </form>       

            <div  style="margin-top: 10px">
                <router-link to="/listJournals">
                    <button class="btn btn-success">Вернуться к списку записей </button>
                </router-link>
            </div>

        
    </div>
</template>

<script>
    import http from "../../http-common";
    import moment from 'moment'
    export default {
        name: "AddJournal",
        data() {
            return {
                journal: {
                    status_id: 0,
                    doctor_id: 0, // пока указываем значения по умолчанию. После реализации регистрации будем отправлять на сторону сервера "нормальные" логин и пароль
                    patient_id: 0,
                    date: moment().format("YYYY-MM-DD"),
                    description: ""
                },
                statusElem: [],
                doctorElem: [],
                patientElem: []                 
            };
        },
        methods: {
            addJournal(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    status_id: this.journal.status_id,
                    doctor_id: this.journal.doctor_id,
                    patient_id: this.journal.patient_id,
                    date: this.journal.date,
                    description: this.journal.description
                };
                // Либо var data = this.user;
                http
                    .post("/addJournal", data)
                    .then(response => { // запрос выполнился успешно
                        this.journal.id = response.data.id;
                        this.$router.push('/listJournals');
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });                
            },
            statusFindAll() {                
                    http
                        .get("/statuses")
                        .then(response => {
                            this.statusElem = response.data;
                            console.log(this.statusElem);
                        })
                        .catch(e => {
                            console.log(e);
                        });                
            },
            doctorFindAll() {                
                    http
                        .get("/doctors")
                        .then(response => {
                            this.doctorElem = response.data;
                            console.log(this.doctorElem);                            
                        })
                        .catch(e => {
                            console.log(e);
                        });                
            },
            patientFindAll() {                
                    http
                        .get("/patients")
                        .then(response => {
                            this.patientElem = response.data;
                            console.log(this.patientElem);                            
                        })
                        .catch(e => {
                            console.log(e);
                        });                
            }
        },
        mounted() { // загружаем данные записи
            this.statusFindAll();
            this.doctorFindAll();
            this.patientFindAll();
        }, 
    }
</script>