<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark" style="margin-top: -20px; padding: 18px">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div v-if="currentDoctor" id="navbarSupportedContent" class="collapse navbar-collapse">  
                <ul class="navbar-nav mr-auto">        
                    <li> <router-link class="nav-item active navbar-brand" to="/listJournals">Записи</router-link> </li>         
                    <li> <router-link class="nav-item active navbar-brand" to="/listDoctors">Доктора</router-link> </li>          
                    <li> <router-link class="nav-item active navbar-brand" to="/listPatients">Пациенты</router-link> </li>
                </ul>
            </div>

            <div v-if="currentDoctor" >
                <router-link  to="/profile" class="nav-item active navbar-brand"> Профиль </router-link>
                <a href @click.prevent="logOut" class="logout nav-item active navbar-brand  "> Выйти </a>
            </div>

            <div v-else>
                <div class="form-group">
                    <router-link to="/login" class="navbar-brand">
                        Войти
                    </router-link>
                    <router-link to="/register" class="navbar-brand">
                        Зарегистрироваться
                    </router-link>
                </div>
            </div>

        </nav>
    </div>
</template>
  
<script>
  export default {
name: "NavBar",
data() {
    return {};

},
computed: { // вычисляемые свойства
    currentDoctor() {
        return this.$store.state.auth.doctor;
    }
},
methods: {
    logOut() {
        this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
        window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
    }
}
};
</script>


<style>
* {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
</style>