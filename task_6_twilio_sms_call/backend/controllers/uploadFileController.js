const fsPromises = require('fs/promises');
const path = require('path');

async function handleFileData(req, res) {
    try {
        const targetPath = path.join(__dirname, '..', 'uploads', 'filepath.txt');
        await fsPromises.writeFile(targetPath, JSON.stringify(req.file.path));
        return res.status(200).json({ message: 'file uploaded' });
    } catch (error) {
        console.error('Error in file operations');
        if (error instanceof Error) console.error(error.message);
        else console.error(error);
    }
}

module.exports = { handleFileData };
