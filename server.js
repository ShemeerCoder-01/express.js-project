const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnections');


const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api/contacts",router);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server listening on port : ${PORT}`);
});