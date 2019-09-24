const express = require('express');
const server = express();
const axios = require('axios');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const helmet = require('helmet');

server.use(fileupload({
    useTempFiles: true,
}))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(helmet());

server.post('/api/upload', async (req, res) => {
    try {
        const { file } = req.files;
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err) {
                console.log('ERROR: ', err);
                throw new Error(err);
            }
            else res.status(201).json({ url: result.url });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});

module.exports = server;