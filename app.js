require('dotenv').config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.sample',
});
if (process.env.NEW_RELIC_KEY) {
    /* eslint-disable global-require */
    require('newrelic');
    /* eslint-enable global-require */
}
const express = require('express');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const socketConfig = require('./socket-config/socket.config')

const app = express();
const db = require('./database.connection');

const MONGO_URL = "mongodb+srv://dixon-datasirpi:4zfPeFQjS175OyQt@cluster0.wmf3wo5.mongodb.net/"
db.connect(MONGO_URL);

const server = http.createServer(app)


socketConfig.initialize(server);  

app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

app.use('*', (req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

// if (require.main === module) {
const PORT = process.env.PORT || 8080
server.listen(PORT, () => { console.log("🔥 Server Running on port " + PORT) })
// } else {
module.exports = { server };
// }

// Graceful Shutdown
