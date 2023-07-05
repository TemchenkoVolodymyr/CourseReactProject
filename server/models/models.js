import sequelize from '../db.js';
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {type: DataTypes.STRING, unique: true },
  password: {type: DataTypes.STRING},
  userName: {type: DataTypes.STRING, unique: true},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
} )

export const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
} )


User.hasMany(Rating)
Rating.belongsTo(User)









