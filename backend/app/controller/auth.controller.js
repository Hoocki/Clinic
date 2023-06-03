var db = require("../config/db.config");
var config = require("../config/auth.config");
var Doctor = db.doctor;
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { doctor } = require("../config/db.config");

exports.register = (req, res) => {
    Doctor.create({
        name: req.body.name, 
        specialization_id: req.body.specialization_id,                
        phone_number: req.body.phone_number,        
        mail: req.body.mail,        
        password: bcrypt.hashSync(req.body.password, 10) // генерация хеша пароля
    })
        .then(() => {
            var result = {
                message: "Доктор зарегистрирован"
            };
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.login = (req, res) => {
    Doctor.findOne({
        where: {
            mail: req.body.mail
        }
    })
        .then(doctor => {
            if (!doctor) {
                res.status(404).send({ message: "Неверно введенная почта и/или пароль" });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                doctor.password
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Неверно введенная почта и/или пароль"
                });
                return;
            }

            var token = jwt.sign({ id: doctor.id }, config.secret, {
                expiresIn: 28800 // 8 часов — время действия токена
            });

            var object = {
                id: doctor.id,
                specialization_id: doctor.specialization_id,
                name: doctor.name,
                phone_number: doctor.phone_number,
                mail: doctor.mail,                
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.doctorBoard = (req, res) => {
    globalFunctions.sendResult(res, "Доктор авторизован");
};