// server.js

const express = require('express');
const videoController = require('./controllers/videoController');

const app = express();
const PORT = 3030;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', videoController.uploadVideo);
app.use('/public', express.static('public'));
app.get('/video/:filename', videoController.streamVideo);

// app.get('/video/:filename', videoController.streamVideo);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
