const express = require('express');

const {dbConnect} = require('./utils/dbconn.util');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

require('dotenv').config();

const app = express();

app.use(express.json())


const PORT = process.env.PORT || 8080;


const server = app.listen(PORT, async () => {

    await dbConnect();

    console.log(`Server is running on port ${PORT}.`);
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);