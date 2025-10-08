import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // adjust path
import { Project } from "./Project.js";

export const ProjectImage = sequelize.define("ProjectImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
Project.hasMany(ProjectImage, { foreignKey: "projectId", onDelete: "CASCADE" });
ProjectImage.belongsTo(Project, { foreignKey: "projectId" });