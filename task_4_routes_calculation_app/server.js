const express = require('express');
const app = express();
const PORT = 4000;
const calculateRouteHandler = require('./routes/calculateRouteHandler');

app.get('/', (req, res) => {
    return res.json({message: 'Welcome to the server'});
});

app.use('/calculate', calculateRouteHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});