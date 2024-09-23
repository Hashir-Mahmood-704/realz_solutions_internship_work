const router = require('express').Router();
const upload = require('../middleware/multer');
const { handleFileData } = require('../controllers/uploadFileController');

router.route('/').post(upload.single('file'), handleFileData);

module.exports = router;