import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import bcrypt from 'bcryptjs';

const User = sequelize.define('user', {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: {
        type: DataTypes.STRING,
        defaultValue: null,
    }, 
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});


User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// await User.sync({force: true});

export default User;