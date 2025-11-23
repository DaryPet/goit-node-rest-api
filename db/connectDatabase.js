import { sequelize } from "../db/index.js";

const connectDatabase = async() => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync();
        console.log("Database connection successful"); 
    }
    catch(error) {
        console.error("Database connect failed", error.message);
        process.exit(1); 
    }
}

export default connectDatabase;