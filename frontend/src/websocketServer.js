const http = require('http');
const websocket = require('ws');

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new websocket.Server({ server });

setInterval(() => {
    wss.clients.forEach(client => {
        //musimy przekazywać miejsce przez ws do backendu
        // musisz wysłać JSON stringa
        client.send(JSON.stringify({
            weather: {
                place: "A no właśnie XD", 
                date: new Date(),
                pressure: rand(990, 1011),
                air_quality: 'dobra',
                humidity: rand(20, 33),
                visibility: rand(12, 33),
                temp_feel: rand(18, 22),
                temp_real: rand(18, 22),
                uv: rand(3, 5),
                rain: rand(0, 22),
                wind: rand(1,5),
                wind_direction: 'SW',
            },
        }));
    });
}, 2*1000);

//Event: 'connection'
wss.on('connection', (ws, _) => {
    ws.send('This is a message from server, connection is established');
    ws.on('message', (msg) => {
        console.log(msg);
    });
});

server.listen(8000);