const router = require('express').Router();

router.route('/').get(function (req, res) {
    return res.json({message: 'Welcome to CSV file uploading app'});
});

module.exports = router;