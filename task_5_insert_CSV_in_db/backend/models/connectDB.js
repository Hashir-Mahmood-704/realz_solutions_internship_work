const mongoose = require('mongoose');

async function connectDB() {
    const url = process.env.MONGO_DB_URL;
    if (!url) throw new Error('MongoDB URL not found');
    await mongoose.connect(url);
}

module.exports = connectDB;