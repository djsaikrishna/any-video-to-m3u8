const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // for demo purposes we're not saving to disk
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Upload your video to convert it to m3u8');
});

app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }

    const inputVideoPath = 'input.mp4';  // Name it based on your requirement
    const outputVideoPath = 'output.m3u8';

    require('fs').writeFileSync(inputVideoPath, req.file.buffer);

    const ffmpegCommand = `ffmpeg -i ${inputVideoPath} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputVideoPath}`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error during conversion.');
        }

        res.send('Video converted successfully!');
        // Optionally, you can send the m3u8 file or its content as a response.
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
