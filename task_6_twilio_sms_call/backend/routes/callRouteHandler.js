const router = require('express').Router();
const { sendCall } = require('../controllers/callController');

router.route('/').get(sendCall);

module.exports = router;