const maxApi = require('max-api');
const io = require('socket.io-client')

maxApi.post('CaptionMax Started');

const url = 'http://localhost:';
let port = 3000;
let socket;

maxApi.addHandler('connect', (newPort = 3000) => {

    port = newPort;
    maxApi.post(`${url}${port}`);

    socket = io(`${url}${port}`, { reconnection: true });
    socket.on('connect', () => {
        maxApi.post('Connected. Socket ID is:', socket.id)
        maxApi.outlet(socket.id);
    });
})

maxApi.addHandler('post', caption => {
    maxApi.post(`Posting to URL: ${url}${port}`);
    maxApi.post(`Caption: ${caption}`);
    socket.emit('query', {"caption": caption});
    socket.on('data', res => {
        maxApi.outlet("image received");
    });
});

// TODO: handle b64 image (sadam?)