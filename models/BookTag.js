module.exports = (sequelize, DataTypes) => {
  const BookTag = sequelize.define(
    "BookTag",
    {
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Book",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tag",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return BookTag;
};
