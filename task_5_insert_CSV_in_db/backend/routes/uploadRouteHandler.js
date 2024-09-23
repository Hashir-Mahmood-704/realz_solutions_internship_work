const router = require('express').Router();
const upload = require('../middleware/multer');
const { handleFileData } = require('../controllers/uploadFileController');

router.route('/').post(upload.single('file'), async function (req, res) {
    await handleFileData(req, res);
});

module.exports = router;