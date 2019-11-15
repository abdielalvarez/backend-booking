const express = require('express');
const app = express();
const { config } = require('./config');
const { port } = config

const restaurantsApi = require('./routes/restaurants')
const searchesApi = require('./routes/searches')

// BodyParser
app.use(express.json());

app.get('/', (req, res) => {
    const userInfo = req.header('user-agent');
    res.send(`UserInfo: ${userInfo}`);
});

// Routes

restaurantsApi(app)
searchesApi(app)

app.listen(port, err => {
    if (err) {
        console.error('Error: ', err);
        return;
    }
    console.log(`Listening http://localhost:${port}`);
});