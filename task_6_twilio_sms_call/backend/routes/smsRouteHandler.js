const router = require('express').Router();
const { sendSMS } = require('../controllers/smsController');

router.route('/').get(sendSMS);

module.exports = router;