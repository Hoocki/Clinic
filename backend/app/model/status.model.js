module.exports = (sequelize, Sequelize) => {
    var Status = sequelize.define(
        'status', // определяем имя таблицы
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

    // Определяем связи таблицы status с другими таблицами
    Status.associate = (models) => {
        // Определение связи один-к-одному с таблицей journal. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы journal): в файле journal.model.js
        Status.hasOne(models.journal, {
            foreignKey: 'status_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Status;
};