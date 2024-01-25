const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = async () => {

    const db = process.env.MONGODB_URI;
    await mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB...', err));
}

module.exports = {dbConnect};