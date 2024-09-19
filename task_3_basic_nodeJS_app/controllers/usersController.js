const fsPromise = require("fs/promises");
const path = require("path");
const usersData = require("../data/usersData.json");

const getAllUsers = (req, res) => {
    return res.json({data: usersData, success: true});
};

const addNewUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "Username and password required", success: false});
    }
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({message: "Username and password must be of string type", success: false});
    }
    const duplicateUsername = usersData.find((user) => user.username.toLowerCase() === username.toLowerCase());
    if (duplicateUsername) {
        return res.status(409).json({message: "Username is already in use, try another one", success: false});
    }
    const newUser = {
        username: username, password: password,
    };
    const usersUpdatedData = [...usersData, newUser];
    try {
        await fsPromise.writeFile(path.join(__dirname, "../data", "usersData.json"), JSON.stringify(usersUpdatedData));
        return res.status(200).json({message: "Successfully created new user", success: true, data: newUser});
    } catch (error) {
        console.error("Error in making new user");
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json({message: error.message, success: false});
        } else {
            console.error(error);
            return res.status(500).json({message: "Error in making new user", success: false});
        }
    }
};

const deleteUser = async (req, res) => {
    const {username, password} = req.body
    if (!password || !username ) {
        return res.status(400).json({message: "Username and password required", success: false});
    }
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({message: "Username and password must be of string type", success: false});
    }
    const findUser = usersData.find((user) => user.username.toLowerCase() === username.toLowerCase());
    if (!findUser) {
        return res.status(404).json({message: "User not found", success: false});
    }
    const isPasswordCorrect = password === findUser.password
    if (!isPasswordCorrect) {
        return res.status(401).json({message: "Incorrect password", success: false});
    }
    const usersUpdatedData = usersData.filter((user) => user.username.toLowerCase() !== username.toLowerCase());
    try {
        await fsPromise.writeFile(path.join(__dirname, "../data", "usersData.json"), JSON.stringify(usersUpdatedData));
        return res.status(200).json({message: "User removed successfully", success: true});
    } catch (error) {
        console.error("Error in removing user");
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json({message: error.message, success: false});
        } else {
            console.error(error);
            return res.status(500).json({message: "Error in making new user", success: false});
        }
    }

}
module.exports = {getAllUsers, addNewUser, deleteUser}
