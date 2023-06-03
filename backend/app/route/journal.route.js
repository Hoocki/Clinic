module.exports = (app) => {
    const journal = require('../controller/journal.controller');
    var { authJwt } = require("../middleware");

    // Получение всех журналов
    app.get('/api/journals', [authJwt.verifyToken], journal.findAll);
    // Получение всех журналов по дате
    app.get('/api/journalsSpecified/beginDate=:begin_date/endDate=:end_date/status=:status/doctor=:doctor', [authJwt.verifyToken], journal.journalsSpecified);
    // Добавление журнала
    app.post('/api/addJournal', [authJwt.verifyToken], journal.create);
    // Обновление данных журнала по id
    app.post('/api/updateJournal/:id', [authJwt.verifyToken], journal.update);
    // Удаление данных журнала по id
    app.post('/api/deleteJournal/:id', [authJwt.verifyToken], journal.delete);
    // Получение журнала по id
    app.get('/api/journal/:id', journal.findById);
    
    app.get('/api/journalsForPatient/:patient_id', journal.findByPatient);
};