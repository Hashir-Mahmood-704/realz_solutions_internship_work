const router = require('express').Router();

router.route('/add/:num1/:num2').get((req, res) => {
    const {num1, num2} = (req.params);
    return res.json({result: Number(num1) + Number(num2)});
});

router.route('/sub/:num1/:num2').get((req, res) => {
    const {num1, num2} = (req.params);
    return res.json({result: Number(num1) - Number(num2)});
});

router.route('/mul/:num1/:num2').get((req, res) => {
    const {num1, num2} = (req.params);
    return res.json({result: Number(num1) * Number(num2)});
});

router.route('/div/:num1/:num2').get((req, res) => {
    const {num1, num2} = (req.params);
    return res.json({result: Number((Number(num1) / Number(num2)).toFixed(2))});
});

router.route('/rem/:num1/:num2').get((req, res) => {
    const {num1, num2} = (req.params);
    return res.json({result: Number(num1) % Number(num2)});
});

module.exports = router;