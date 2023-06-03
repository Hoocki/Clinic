<template>
    <form name="form" @submit="handleLogin" style="padding: 20px; width: 400px;">

        <div class="form-group">
            <input type="text" class="form-control" name="mail" placeholder="Почта" v-model="doctor.mail" required/>
        </div>

        <div class="form-group" style="margin-top: 10px">
            <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="doctor.password" required/>
        </div>

        <div class="form-group" style="margin-top: 10px">
            <button class="btn btn-primary" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Войти</span>
            </button>
        </div>

        <div class="form-group" style="margin-top: 10px">
            <div v-if="message" class="alert alert-danger" role="alert"> {{message}} </div>
        </div>

    </form>
</template>

<script>
    export default {
        name: 'LoginDoctor',
        data() {
            return {
                doctor: {
                    name: "",
                    mail: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.doctor) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/listJournals'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>