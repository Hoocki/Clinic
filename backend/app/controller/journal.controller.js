var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Journal = db.journal;
var Doctor = db.doctor;
var Patient = db.patient;

// Получение всех пользователей
exports.findAll = (req, res) => {
    Journal.findAll({ 
        include: [{
                model: Doctor,
                as: 'doctor',
                required: false,
                attributes: ['name']
            }, {
                model: Patient,
                as: 'patient',
                required: false,
                attributes: ['name']
            }],
        required: false
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Добавление пользователя
exports.create = (req, res) => {
    Journal.create({
        status_id: req.body.status_id,
        doctor_id: req.body.doctor_id,
        patient_id: req.body.patient_id,
        date: req.body.date,
        description: req.body.description
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    Journal.update({
            status_id: req.body.status_id,
	        doctor_id: req.body.doctor_id,
	        patient_id: req.body.patient_id,
	        date: req.body.date,
	        description: req.body.description
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
    Journal.destroy({
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
    Journal.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

const { Op } = require('sequelize');

exports.journalsSpecified = (req, res) => {
    let where = {
        date: {
            [Op.and]: {
                [Op.gte]: req.params.begin_date,
                [Op.lte]: req.params.end_date
            }
        }
    };
    let include = [{
                model: Doctor,
                as: 'doctor',
                required: false,
                attributes: ['name']
            }, {
                model: Patient,
                as: 'patient',
                required: false,
                attributes: ['name']
            }];
    if (req.params.status != 0) {
        where['status_id'] = req.params.status;
    }
    if (req.params.doctor != 0) {
        where['doctor_id'] = req.params.doctor;
    }
    Journal.findAll({ 
        where,
        include,
        required: false
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findByPatient = (req, res) => {
    Journal.findAll({
        where: {
            patient_id: req.params.patient_id
        },
        include: [{
                model: Doctor,
                as: 'doctor',
                required: false,
                attributes: ['name']
            }],
        required: false
    }).then(object => {
        globalFunctions.sendResult(res, object);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};