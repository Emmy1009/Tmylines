import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // your Sequelize connection

export const ContactMessage = sequelize.define("ContactMessage", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});