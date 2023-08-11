const fs = require('fs');
const path = require('path');

const videoDirectory = path.join(__dirname, '..', 'uploads');

const getVideoPath = (filename) => {
    return path.join(videoDirectory, filename);
};

const videoExists = (filename) => {
    const videoPath = getVideoPath(filename);
    return fs.existsSync(videoPath);
};

module.exports = {
    getVideoPath,
    videoExists,
};
