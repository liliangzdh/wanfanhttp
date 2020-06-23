/**
 * Created by liliang on 2020/6/23
 */

const router = require('express').Router();
const arr = require('../json/detail.json');
const send =  require('../util/responseUtils');
// api/user
router.get('/', function(req, res) {
    res.send("edddd");
});

// api/user/:id
// 学信网 页面详情。
router.get('/info', function (request, response) {
    let result = {};
    for (let bean of arr) {
        if (bean.onlineVerificationCode === request.query.code) {
            result = bean;
            break;
        }
    }
    let bean = {
        //传参
        username: result.username,
        sex: result.sex,
        IDCard: result.IDCard,
        nation: result.nation,
        birthday: result.birthday,
        university: result.university,
        arrangement: result.arrangement,
        department: result.department,
        class: result.class,
        major: result.major,
        studentNumber: result.studentNumber,
        form: result.form,
        enrollmentTime: result.enrollmentTime,
        schoolSystem: result.schoolSystem,
        type: result.type,
        status: result.status,
        onlineVerificationCode: result.onlineVerificationCode,
        updateDate: result.updateDate,
        avatar:result.avatar,
    };
    //调用渲染模板
    response.render('info', bean);

});

// 是否 含有 这个 code。
router.get('/:id/code', function(req, res) {
    let id = req.params.id;
    let result = null;
    for (let bean of arr) {
        if (bean.onlineVerificationCode === id) {
            result = bean;
            break;
        }
    }
    send(res,result,result==null?400:200);
});



module.exports = router;
