const fsPromises = require('fs/promises');
const User = require('../models/UserModel');

async function handleFileData(req, res) {
    try {
        const fileData = await fsPromises.readFile(req.file.path, 'utf8');
        const fileDataIntoArray = fileData.split('\n').slice(1);
        if (!fileDataIntoArray || fileDataIntoArray.length < 1) {
            throw new Error('Something went wrong. File data array is empty');
        }
        const fileDataIntoArrayObjects = fileDataIntoArray.map(function (item) {
            const splitItem = item.trim().split(',');
            return {
                name: splitItem[0],
                email: splitItem[1],
                phone: splitItem[2]
            };
        });
        const response = await User.insertMany(fileDataIntoArrayObjects);
        if (response && response.length > 0)
            console.log('Inserted data into database successfully');
        else throw new Error('Something went wrong, unexpected response from database!');
    } catch (error) {
        console.error('Error in file operations');
        if (error instanceof Error) console.error(error.message);
        else console.error(error);
    }
    return res.status(200).json({ message: 'file uploaded' });
}

module.exports = { handleFileData };
