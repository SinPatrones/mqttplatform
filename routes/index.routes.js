const express = require('express');
const router = express.Router();

router.route('/index')
    .get((req, res) => res.json({status: "ok"}));

module.exports = router;