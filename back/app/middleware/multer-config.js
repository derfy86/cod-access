/**
 * @module multerConfig
 */

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'upload');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + '_' + name);
  }
});

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // if (file.mimetype !== 'image/jpg' &&  file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    //   return callback(null, false, new Error('Only images are allowed'));
    // }
    callback(null, true)}}).single('picture');

