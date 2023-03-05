const CreateUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    }, {
      timestamps: false,
      tabelName: 'users',
      underscored: true,
    });
    User.associate = (models) => {
      User.hasMany(models.BlogPost, { as: 'BlogPost', foreignKey: 'userId' })
    };
    return User;
  };
  
  module.exports = CreateUser;