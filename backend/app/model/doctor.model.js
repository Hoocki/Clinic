module.exports = (sequelize, Sequelize) => {
    var Doctor = sequelize.define(
        'doctor', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            phone_number: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            specialization_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            mail: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            }
        });

    // Определяем связи таблицы doctor с другими таблицами
    Doctor.associate = (models) => {
        // Определение связи один-ко-многим с таблицей specialization. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы specialization): в файле specialization.model.js
        Doctor.belongsTo(models.specialization, {
            foreignKey: 'specialization_id'
        });
        // Определение связи один-ко-многим с таблицей journal. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы journal): в файле journal.model.js
        Doctor.hasMany(models.journal, {
            foreignKey: 'doctor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Doctor;
};