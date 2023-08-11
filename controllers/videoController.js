const fs = require('fs');
const { exec } = require('child_process');
const videoModel = require('../models/videoModel');
const multer = require('multer');

// File upload setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }
    const inputVideoPath = req.file.path; 
    const outputVideoPath = 'public/output-' + Date.now() + '.m3u8';

    const ffmpegCommand = `ffmpeg -i ${inputVideoPath} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputVideoPath}`;

    exec(ffmpegCommand, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error during conversion.');
        }
        res.send('Video is being converted. Please check back later.');
    });
};

const streamVideo = (req, res) => {
    // const videoFilename = req.params.filename;
    const filename = req.params.filename;

    if (!videoModel.videoExists(videoFilename)) {
        return res.status(404).send('Video not found.');
    }
    const videoPath = videoModel.getVideoPath(videoFilename);
    // ... Remaining code for streaming video (similar to the earlier mentioned code)
};

module.exports = {
    uploadVideo: [upload.single('video'), uploadVideo],
    streamVideo
};
