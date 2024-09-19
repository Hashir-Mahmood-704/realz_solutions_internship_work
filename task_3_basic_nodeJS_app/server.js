const express = require("express");
const rootRouteHandler = require("./routes/rootRouteHandler");
const usersRouteHandler = require("./routes/usersRouteHandler");

const app = express();
const PORT = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", rootRouteHandler)
app.use("/users", usersRouteHandler)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
