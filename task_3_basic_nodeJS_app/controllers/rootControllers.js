const sayHello = (req, res) => {
    return res.json({message: "You sent Get request to root"})
}

module.exports = {sayHello}