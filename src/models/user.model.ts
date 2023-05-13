import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string | undefined>;
  declare username: string | undefined;
  declare email: string;
  declare password: string;
  declare imgUrl: CreationOptional<string>;
  declare isDeleted: CreationOptional<boolean>;
  declare deletedAt: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",
    },
    imgUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    deletedAt: { type: DataTypes.DATE, defaultValue: null },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  // { tableName: "users", sequelize, defaultScope: { attributes: { exclude: ["password"] } } }
  { tableName: "users", sequelize }
);

export default User;
