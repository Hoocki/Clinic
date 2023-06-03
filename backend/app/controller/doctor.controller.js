var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Doctor = db.doctor;

// Получение всех пользователей
exports.findAll = (req, res) => {
    Doctor.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


// Добавление пользователя
exports.create = (req, res) => {
    Doctor.create({
        name: req.body.name,
        specialization_id: req.body.specialization_id,
        phone_number: req.body.phone_number,        
        mail: req.body.mail,
        password: req.body.password
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    Doctor.update({
            name: req.body.name,
            specialization_id: req.body.specialization_id,
            phone_number: req.body.phone_number,            
            mail: req.body.mail,
            password: req.body.password
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    Doctor.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
    Doctor.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных пользователя по name
exports.findByName = (req, res) => {
    Doctor.findAll({
        where: {
            name: req.params.name
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};