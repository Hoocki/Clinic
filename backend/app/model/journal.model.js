module.exports = (sequelize, Sequelize) => {
    var Journal = sequelize.define(
        'journal', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            status_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            doctor_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            patient_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(255), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
        });

    // Определяем связи таблицы journal с другими таблицами
    Journal.associate = (models) => {
        // Определение связи один-ко-многим с таблицей status. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы status): в файле status.model.js
        Journal.belongsTo(models.status, {
            foreignKey: 'status_id'
        });
        Journal.belongsTo(models.doctor, {
            foreignKey: 'doctor_id'
        });
        Journal.belongsTo(models.patient, {
            foreignKey: 'patient_id'
        });
    };
    return Journal;
};