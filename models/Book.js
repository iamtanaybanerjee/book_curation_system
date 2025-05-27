module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Book.associate = (models) => {
    Book.belongsTo(models.User, { foreignKey: "userId" });
  };
  Book.associate = (models) => {
    Book.belongsToMany(models.Tag, { through: models.BookTag });
  };

  return Book;
};
