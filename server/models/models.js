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
  rate: {type: DataTypes.FLOAT, allowNull: false},
  userId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',},
  movieId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',}
} )

export const Favorite = sequelize.define('favorite', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',},
  movieId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',}
})

export const Watchlist = sequelize.define('watchlist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',},
  movieId: {type: DataTypes.INTEGER, allowNull: false, unique: 'user_movie',}
})

export const Review = sequelize.define('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING, allowNull: false},
  userId: {type: DataTypes.INTEGER, allowNull: false},
  movieId: {type: DataTypes.INTEGER, allowNull: false}
})


User.hasMany(Rating, {foreignKey: 'userId', onDelete: 'CASCADE'});
Rating.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Favorite, {foreignKey: 'userId', onDelete: 'CASCADE'})
Favorite.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Watchlist, {foreignKey: 'userId', onDelete: 'CASCADE'})
Watchlist.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Review, {foreignKey: 'userId', onDelete: 'CASCADE'})
Review.belongsTo(User, {foreignKey: 'userId'});













