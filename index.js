const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const port = 3020;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
const upload = multer({ storage: storage });
  

app.get('/', (req, res) => {
    res.send('Upload your video to convert it to m3u8');
});


app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }

    const inputVideoPath = req.file.path; 
    const outputVideoPath = 'output-' + Date.now() + '.m3u8';

    const ffmpegCommand = `ffmpeg -i ${inputVideoPath} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputVideoPath}`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error during conversion.');
        }
        // You can implement a mechanism to serve the .m3u8 file or notify the user when it's done.
        res.send('Video is being converted. Please check back later.');
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
