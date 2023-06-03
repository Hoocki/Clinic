<template>
    <div class="">

        <form name="form" @submit="handleRegister" style="padding: 20px; width: 400px;">

            <div v-if="!successful">
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="ФИО" v-model="doctor.name" required/>
                </div>

                <div class="form-group" style="margin-top: 10px">
                    <select name="specialization" id="specialization" class="form-select" required v-model="doctor.specialization_id">  
                        <option v-for="(elem_specialization, index) in specializationElem" :key="index" v-bind:value="elem_specialization.id">
                            {{elem_specialization.name}}
                        </option>
                    </select> 
                </div>

                <div class="form-group" style="margin-top: 10px">
                    <input type="text" class="form-control" name="phone_number" placeholder="Телефон" v-model="doctor.phone_number" required/>
                </div>

                <div class="form-group" style="margin-top: 10px">
                    <input type="text" class="form-control" name="mail" placeholder="Почта" v-model="doctor.mail" required/>
                </div>

                <div class="form-group" style="margin-top: 10px">
                    <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="doctor.password" required/>
                </div>

                <div class="form-group" style="margin-top: 10px">
                    <button class="btn btn-primary">Зарегистрировать</button>
                </div>
            </div>

            <div class="form-group" style="margin-top: 10px">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>

        </form>
    </div>
</template>
<script>
    import http from "../../http-common";
    export default {
        name: 'RegisterDoctor',
        data() {
            return {
                doctor: {
                    name: "",
                    specialization_id: 0,
                    phone_number: "",
                    mail: "",
                    password: ""
                },
                successful: false,
                message: '',
                specializationElem: []
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            this.specializationFindAll();
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleRegister(e) {
                e.preventDefault();
                this.message = '';

                this.$store.dispatch("auth/register", this.doctor) // обращаемся к методу register, который определён в auth.service.js
                    .then( data => {
                        this.message = data.message;
                        this.successful = true;
                    })
                    .catch(e => {
                            this.message = e.response.data.message;
                        }
                    );

            },
            specializationFindAll() {                
                    http
                        .get("/specializations")
                        .then(response => {
                            this.specializationElem = response.data;
                            console.log(this.specializationElem);
                        })
                        .catch(e => {
                            console.log(e);
                        });                
            },
        }
    };
</script>