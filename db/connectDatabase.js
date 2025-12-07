import { sequelize } from "../db/index.js";

const connectDatabase = async() => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync();
        console.log("Database connection successful"); 
    }
    catch(error) {
        console.error("Database connect failed", error.message);
        console.error("Database connect failed:", error);
        // Не завершай процесс сразу, дай увидеть ошибку
        throw error;
        process.exit(1); 
    }
}

export default connectDatabase;