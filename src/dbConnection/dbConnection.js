import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection =  mongoose.connection;

        connection.on("connect", () => {
            console.log('Database connected');
        });

        connection.on("error", (error) => {
            console.log('Something went wrong', error);
            process.exit()
        });
    } catch (error) {
        console.log("Something went wrong in connectiong the database");
        console.log(error);
    }
}