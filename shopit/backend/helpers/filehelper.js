'use strict';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    },
   
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter}).single('categoryImage');

module.exports = {upload}