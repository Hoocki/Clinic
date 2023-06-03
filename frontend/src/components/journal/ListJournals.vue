<template>
    <div style="padding:5px 20px 5px 20px; font-size: 18px">

        <div v-if="displayContent">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-2">
                        <label for="date" class="form-group" style="margin-top: 0px">Выберите начало недели</label>
                        <input type="date" name="date" id="date" required v-model="user_date" class="form-control" style="margin-top: 0px">
                    </div>

                    <div class="col-2">
                        <label for="status" class="form-group" style="margin-top: 0px">Выберите статус:</label>
                        <select name="status" id="status" class="form-select" required v-model="journal.status_id" style="margin-top: 0px">  
                            <option v-for="(status_elem, index) in statusElem" :key="index" v-bind:value="status_elem.id">
                                {{status_elem.name}}
                            </option>
                        </select>
                    </div>

                    <div class="col-3">
                        <label for="doctor" class="form-group" style="margin-top: 0px">Выберите доктора:</label>
                        <select name="doctor" id="doctor" class="form-select" required v-model="journal.doctor_id" style="margin-top: 0px">  
                            <option v-for="(doctor_elem, index) in doctorElem" :key="index" v-bind:value="doctor_elem.id">
                                {{doctor_elem.name}}
                            </option>
                        </select> 
                    </div>

                    <div class="col">
                        <button type="submit" class="btn btn-success" v-on:click="currentJournals" value="Найти" style="margin-top: 25px; margin-left: 5px;">Отобразить выбраные записи</button>
                        <router-link class="item" to="/addJournal">
                            <button class="btn btn-primary" style="margin-top: 25px; margin-left: 5px;">Добавить запись</button>
                        </router-link>
                    </div>
                </div>

                <div class="row" style="margin-top: 20px">
                    <div class="col" v-for="(date, index) in datesList" :key="index">
                        <label class="form-control" disabled readonly> {{date}} </label>
                        <ul class="list-group" style="margin-top: 15px;">
                            <li class="list-group-item" v-for="(journal, index)  in table[date]" :key="index" style="font-size: 16px;">
                                <router-link :to="{
                                        name: 'journal-details',
                                        params: { id: journal.id }
                                    }" style="text-decoration: inherit; color: black">
                                    Пациент: {{journal.patient.name}}, Лечащий врач: {{journal.doctor.name}}, Описание: {{(journal.description)}}
                                </router-link>                                         
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <label for="status" class="alert alert-info" style="margin-top: 8px">Контент доступен только авторизованным пользователям</label>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import DoctorService from '../../services/doctor.service';
    import moment from 'moment'
    moment.locale('ru');
    export default {
        name: "ListJournals", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                journal: {
                    status_id: 0,
                    doctor_id: 0,
                },
                journals: [],
                table: new Map(),
                datesList: [],
                statusElem: [],
                doctorElem: [],
                user_date: moment().format("YYYY-MM-DD"),              
                begin_date: new Date(),
                end_date: new Date(),
                doctorJournal: new Map(),
                displayContent: false // по умолчанию скрываем контент
            };
        },
        methods: { // методы компонента            
            getJournals() {
                this.currentJournals();
            },
            currentJournals() {
                this.begin_date = (moment(this.user_date, 'YYYY-MM-DD').startOf('isoWeek')).format("YYYY-MM-DD");
                this.end_date = (moment(this.user_date, 'YYYY-MM-DD').endOf('isoWeek')).format("YYYY-MM-DD");

                this.datesList = [];
                for (let i = 0; i <= 6; i++) {
                    this.datesList.push( moment(this.begin_date, 'YYYY-MM-DD').add(i, 'days').format("YYYY-MM-DD") );
                }
                http
                    .get("/journalsSpecified/beginDate=" + this.begin_date + "/endDate=" + this.end_date + "/status=" + this.journal.status_id + "/doctor=" + this.journal.doctor_id) // обращаемся к серверу для получения списка отсортированных записей
                    .then(response => { // запрос выполнен успешно
                        this.journals = response.data;
                        if (this.journals.length === 0){                            
                            alert("За выбранный период записей не найдено");
                            return; // прерываем выполнение метода
                        }
                        this.table = new Map();
                        for (let jrn of this.journals) {
                            if (!{}.hasOwnProperty.call(this.table, jrn.date)) {
                                this.table[jrn.date] = [];
                                console.log('amogus');
                            }
                            this.table[jrn.date].push(jrn);
                        }
                        console.log(this.table);                      
                    })                                       
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
            statusFindAll() {                
                http
                    .get("/statuses")
                    .then(response => {
                        this.statusElem = response.data;                           
                    })
                    .catch(e => {
                        console.log(e);
                    });                
            },
            getAllDoctors() {                
                http
                    .get("/doctors")
                    .then(response => {
                        this.doctorElem = response.data;                            
                        for (var i = 0; i < this.doctorElem.length; i++){
                            this.doctorJournal.set(this.doctorElem[i].id, this.doctorElem[i].name);
                        }
                        //console.log(this.doctorJournal);                            
                    })
                    .catch(e => {
                        console.log(e);
                    });                
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
            this.getJournals();          
            this.statusFindAll();
            this.getAllDoctors();                                 
        }
    }
</script>