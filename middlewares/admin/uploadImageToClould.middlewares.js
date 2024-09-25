const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configuration cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// End configuration cloudinary


module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {

                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            try {
                let result = await streamUpload(req);
                const tagName = req.file.fieldname;
                req.body[tagName] = result.secure_url;
                next();
            } catch (error) {
                console.log(error);
            }
        }
        upload(req)
    } else {
        next();
    }
}