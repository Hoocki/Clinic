module.exports = (sequelize, Sequelize) => {
    var Patient = sequelize.define(
        'patient', // определяем имя таблицы
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
            }
        });

    // Определяем связи таблицы patient с другими таблицами
    Patient.associate = (models) => {
        // Определение связи один-ко-многим с таблицей journal. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы journal): в файле journal.model.js
        Patient.hasMany(models.journal, {
            foreignKey: 'patient_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Patient;
};