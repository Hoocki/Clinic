<template>
    <div style="padding:20px; width: 450px; font-size: 18px">
        <h3>Профиль  <strong> {{currentDoctor.name}} </strong> </h3>       
        <div class="form-group">
            <label for="name" style="margin-top: 10px">Почта</label>
            <input type="text" name="mail" id="mail" placeholder="Почта" required v-model="currentDoctor.mail" class="form-control" style="margin-top: 4px">
        </div>
        <div class="form-group" style="margin-top: 10px">
            <label for="name">ФИО</label>
            <input type="text" name="name" id="name" placeholder="ФИО" required v-model="currentDoctor.name" class="form-control" style="margin-top: 4px">
        </div>
        <div class="form-group" style="margin-top: 10px">
            <label for="name">Номер телефона</label>
            <input type="text" name="phone_number" id="phone_number" placeholder="Номер телефона" required v-model="currentDoctor.phone_number" class="form-control" style="margin-top: 4px">
        </div>
        <form @submit="updateDoctor" style="margin-top: 10px">
            <button  class="btn btn-success">Обновить</button>
        </form> 
    </div>
</template>
<script>
import http from "../../http-common";
    export default {
        name: 'ProfileDoctor',
        computed: {
            currentDoctor() {
                return this.$store.state.auth.doctor;
            }
        },
        methods: {            
            updateDoctor(e) {
                e.preventDefault();                
                var data = {
                    mail: this.currentDoctor.mail,
                    name: this.currentDoctor.name,                                      
                    phone_number: this.currentDoctor.phone_number                    
                };
                http
                    .post("/updateDoctor/" + this.currentDoctor.id, data)
                    .then(() => {
                        console.log(this.currentDoctor.mail);
                        this.$store.dispatch('auth/logout');
                        window.location.href = '/login';
                    })
                    .catch(e => {
                        console.log(e);
                        
                    });                
            }
        },
        mounted() {
            if (!this.currentDoctor) {
                this.$router.push('/login');
            }
        }
    };
</script>