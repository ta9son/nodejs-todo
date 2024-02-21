require('dotenv').config();
const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
const PORT = 3000;

app.use(express.json());
app.use(express.static('./public'));
app.use("/api/v1/tasks",tasksRouter);

// データベースとの接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();




