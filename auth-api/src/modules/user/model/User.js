import Sequelize from "sequelize";

import sequelize from "../../../config/db/dbConfig.js";

const User = sequelize.define("user", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: true
    }
},{})

export default User;