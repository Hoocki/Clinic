module.exports = (app) => {
    const patient = require('../controller/patient.controller');
    var { authJwt } = require("../middleware");

    // Получение всех пациентов
    app.get('/api/patients', [authJwt.verifyToken], patient.findAll);
    // Добавление пациента
    app.post('/api/addPatient', [authJwt.verifyToken], patient.create);
    // Обновление данных пациента по id
    app.post('/api/updatePatient/:id', [authJwt.verifyToken], patient.update);
    // Удаление данных пациента по id
    app.post('/api/deletePatient/:id', [authJwt.verifyToken], patient.delete);
    // Получение пациента по id
    app.get('/api/patient/:id', patient.findById);
    // Получение пациента по name
    app.get('/api/patient/name/:name', patient.findByName);
};