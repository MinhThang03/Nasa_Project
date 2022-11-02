const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require('./models/planets.model')

const sever = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    sever.listen(PORT, () => {
        console.log(`Listen on port ${PORT}...`);
    });
}

startServer();


console.log(PORT)