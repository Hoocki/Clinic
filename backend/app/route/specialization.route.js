module.exports = (app) => {
    const specialization = require('../controller/specialization.controller');
    var { authJwt } = require("../middleware"); 
    // Получение всех специализаций
    app.get('/api/specializations', specialization.findAll);
    // Добавление специализация
    app.post('/api/addSpecialization', [authJwt.verifyToken], specialization.create);
    // Обновление данных специализация по id
    app.post('/api/updateSpecialization/:id', [authJwt.verifyToken], specialization.update);
    // Удаление данных специализация по id
    app.post('/api/deleteSpecialization/:id', [authJwt.verifyToken], specialization.delete);
    // Получение специализация по id
    app.get('/api/specialization/:id', specialization.findById);
    // Получение специализация по name
    app.get('/api/specialization/name/:name', specialization.findByName);
};