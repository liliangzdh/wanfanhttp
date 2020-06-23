/**
 * Created by liliang on 2020/6/23
 */

const router = require('express').Router();

// split up route handling
// router.use('/data', require('./data'));
router.use('/user', require('./user'));


module.exports = router;
