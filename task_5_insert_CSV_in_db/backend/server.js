const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./models/connectDB');
const rootRouteHandler = require('./routes/rootRoutehandler');
const uploadRouteHandler = require('./routes/uploadRoutehandler');
const app = express();
const port = 4000;
const cors = require('cors');
dotenv.config();

app.use(cors());
app.use('/', rootRouteHandler);
app.use('/upload', uploadRouteHandler);

connectDB().then(function () {
    console.log('Database Connected!');
    app.listen(port, function () {
        console.log(`Server started on port ${port}`);
    });
}).catch(function (error) {
    console.error("Database connection failed!");
    if (error instanceof Error) console.error(error.message);
    throw error;
});
