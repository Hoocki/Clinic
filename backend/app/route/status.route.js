module.exports = (app) => {
    const status = require('../controller/status.controller');

    // Получение всех статусов
    app.get('/api/statuses', status.findAll);
    // Добавление статуса
    app.post('/api/addStatus', status.create);
    // Обновление данных статуса по id
    app.post('/api/updateStatus/:id', status.update);
    // Удаление данных статуса по id
    app.post('/api/deleteStatus/:id', status.delete);
    // Получение статуса по id
    app.get('/api/status/:id', status.findById);
    // Получение статуса по name
    app.get('/api/status/name/:name', status.findByName);
};