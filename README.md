# Video to m3u8 Converter (Node.js)

A simple Node.js application that converts any video format to `.m3u8` (HLS) format using `ffmpeg`.

## Features

-   Upload any video format.
-   Uses `ffmpeg` to convert the video to `.m3u8` format.

## Prerequisites

-   [Node.js](https://nodejs.org/)
-   [ffmpeg](https://ffmpeg.org/download.html)

## Installation

1.  **Clone the Repository**:
    
    `git clone https://github.com/your_username/repo_name.git
    cd repo_name` 
    
    _Replace `your_username` and `repo_name` with your GitHub username and repository name, respectively._
    
2.  **Install Node.js Dependencies**:
    
    `npm install` 
    
3.  **Start the Server**:
    
    `node server.js` 
    

## Usage

1.  **Using Postman**:
    -   Set the request method to `POST`.
    -   Enter the URL `http://localhost:3000/upload`.
    -   Under the "Body" tab, select "form-data".
    -   Use the key `video` and set the type to "File", then select your video file.
    -   Click "Send" to start the conversion.

## Considerations

-   This is a basic implementation designed for demonstration purposes. It uses `multer`'s memory storage, which may not be suitable for large video files.
-   Error handling and file cleanup are minimal. Make sure to delete any temporary files generated during the conversion process if they aren't automatically removed.

## License

This project is open source and available under the [MIT License](https://chat.openai.com/LICENSE).

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

----------
