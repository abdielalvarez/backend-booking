const express = require('express');
const app = express();
const { config } = require('./config');
const { port } = config

const restaurantsApi = require('./routes/restaurants');
const searchesApi = require('./routes/searches');
const authApi = require('../src/routes/auth');

// BodyParser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
})); 

app.get('/', (req, res) => {
    const userInfo = req.header('user-agent');
    res.send(`UserInfo: ${userInfo}`);
});

// Routes

authApi(app)
restaurantsApi(app)
searchesApi(app)

app.listen(port, err => {
    if (err) {
        console.error('Error: ', err);
        return;
    }
    console.log(`Listening http://localhost:${port}`);
});