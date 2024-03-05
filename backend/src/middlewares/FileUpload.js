import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function fileUpload(req, res, next) {
    try {
        if (req.file) {
            // Convert buffer to Readable Stream
            const stream = streamifier.createReadStream(req.file.buffer);

            const cloudinaryStream = cloudinary.uploader.upload_stream(
                { folder: 'profile-pictures' }, // Add additional options as needed
                (error, result) => {
                    if (error) {
                        next(error);
                    } else {
                        req.fileUrl = result.secure_url;
                        next();
                    }
                }
            );

            stream.pipe(cloudinaryStream);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

export { upload, fileUpload };

