module.exports = (app) => {
    const doctor = require('../controller/doctor.controller');
    var { authJwt } = require("../middleware");    

    // Получение всех докторов
    app.get('/api/doctors', [authJwt.verifyToken], doctor.findAll);
    // Добавление доктора
    app.post('/api/addDoctor', [authJwt.verifyToken], doctor.create);
    // Обновление данных доктора по id
    app.post('/api/updateDoctor/:id', [authJwt.verifyToken], doctor.update);
    // Удаление данных доктора по id
    app.post('/api/deleteDoctor/:id', [authJwt.verifyToken], doctor.delete);
    // Получение доктора по id
    app.get('/api/doctor/:id', doctor.findById);
    // Получение доктора по name
    app.get('/api/doctor/name/:name', doctor.findByName);
};