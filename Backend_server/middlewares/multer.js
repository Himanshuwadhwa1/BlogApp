import multer from "multer";
const uploadMiddle = multer({ dest: 'uploads/' })

export {uploadMiddle};