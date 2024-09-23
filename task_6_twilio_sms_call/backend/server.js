const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const rootRouteHandler = require('./routes/rootRouteHandler');
const uploadRouteHandler = require('./routes/uploadRoutehandler');
const smsRouterHandler = require('./routes/smsRouteHandler');
const callRouteHandler = require('./routes/callRouteHandler');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use('/', rootRouteHandler);
app.use('/upload', uploadRouteHandler);
app.use('/sms', smsRouterHandler);
app.use('/call', callRouteHandler);

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});