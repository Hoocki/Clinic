const { doctor } = require('../config/db.config.js');
var db = require('../config/db.config.js');
var Doctor = db.doctor;
// регистрация пользователя с предварительной проверкой существования логина
exports.checkDuplicateDoctorname = (req, res, next) => {
    Doctor.findOne({
        where: {
            mail: req.body.mail
        }
    }).then(doctor => {
        if (doctor) {
            res.status(400).send({
                message: "Доктор с данной почтой уже существует"
            });
            return;
        }
        // если пользователя с переданным логином не существует, то переходим к следующему этапу регистрации
        next();
    });
};