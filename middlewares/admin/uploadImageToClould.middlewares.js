const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configuration cloudinary
cloudinary.config({
    cloud_name: 'dtaoxer0u',
    api_key: '927454746273598',
    api_secret: '9R9wK9A5ScSVrN6LdI0DOasT2-E' 
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
                req.body.thumbnail = result.secure_url;

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