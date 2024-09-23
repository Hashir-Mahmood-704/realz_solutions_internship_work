const fsPromise = require('fs/promises');
const path = require('path');
const { sendCallToNumber } = require('../twilio');

async function sendCall(req, res) {
    try {
        const filePath = path.join(__dirname, '..', 'uploads', 'filepath.txt');
        const readFilePath = await fsPromise.readFile(filePath, 'utf-8');
        const readDataFromFile = await fsPromise.readFile(readFilePath.slice(1, readFilePath.length - 1), 'utf-8');
        const dataInArrayForm = readDataFromFile.split("\n").map(item => item.trim());
        for (const item of dataInArrayForm) await sendCallToNumber(item);
        return res.json({ message: "Call sent successfully to all numbers", success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Something went wrong', success: false });
    }
}

module.exports = { sendCall };