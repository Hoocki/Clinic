<template>
    <div style="padding: 20px; width: 400px;">
        <h4>Добавление пациента</h4>        
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addUser определён в script-->
            <form @submit="addPatient">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                
                <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="patient.name" style="margin-top: 4px">
                
                <input type="text" class="form-control" name="phone_number" id="phone_number" placeholder="Номер телефона" required v-model="patient.phone_number" style="margin-top: 10px">
                
                <input type="submit" value="Добавить" class="btn btn-primary" style="margin-top: 10px">
            </form>          
            <router-link to="/listPatients">
                <button class="btn btn-success" style="margin-top: 10px">Вернуться к списку пациентов </button>
            </router-link>
            
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddPatient",
        data() {
            return {
                patient: {
                    name: "",
                    phone_number: ""
                    
                }                
            };
        },
        methods: {
            addPatient(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.patient.name,
                    phone_number: this.patient.phone_number                    
                };
                // Либо var data = this.user;
                http
                    .post("/addPatient", data)
                    .then(response => { // запрос выполнился успешно
                        this.patient.id = response.data.id;
                        this.$router.push('/listPatients');
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });                
            }            
        }
    }
</script>