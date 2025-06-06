module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
    },
    { timestamps: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Book, { foreignKey: "userId" });
  };

  return User;
};
