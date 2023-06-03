module.exports = (sequelize, Sequelize) => {
    var Specialization = sequelize.define(
        'specialization', // определяем имя таблицы
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
            }
        });

    // Определяем связи таблицы specialization с другими таблицами
    Specialization.associate = (models) => {
        // Определение связи один-ко-многим с таблицей doctor. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы doctor): в файле doctor.model.js
        Specialization.hasMany(models.doctor, {
            foreignKey: 'specialization_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Specialization;
};