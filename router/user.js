/**
 * Created by liliang on 2020/6/23
 */

const router = require('express').Router();
const arr = require('../json/detail.json');
const send = require('../util/responseUtils');
// api/user
router.get('/', function (req, res) {
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
        avatar: result.avatar,
    };
    //调用渲染模板
    response.render('info', bean);

});

// 微信小程序 头部获取
// 是否 含有 这个 code。
router.get('/tip', function (req, res) {
    send(res, {
        "logo": '/images/logo.png',
        "title": '学新网二维码结果获取',
        "content": "可以获取任何二维码结果，并显示",
        "hostname ": req.hostname,
        "dev": true,
    }, 200);
});

// 是否 含有 这个 code。
router.get('/:id/code', function (req, res) {
    let id = req.params.id;
    let result = null;
    for (let bean of arr) {
        if (bean.onlineVerificationCode === id) {
            result = bean;
            break;
        }
    }
    send(res, result, result == null ? 400 : 200);
});

// 返回 app 需要的
router.get("/:id/infoForApp", function (req, res) {
    let id = req.params.id;
    let result = null;
    for (let bean of arr) {
        if (bean.onlineVerificationCode === id) {
            result = bean;
            break;
        }
    }

    if (result == null) {
        send(res, result, 400);
        return
    }


    let list = [];

    let bottom = [];

    list.push({"name":'院校',value:result['university']});
    list.push({"name":'层次',value:result['arrangement']});
    list.push({"name":'院系',value:result['department']});
    list.push({"name":'班级',value:result['class']});
    list.push({"name":'专业',value:result['major']});
    list.push({"name":'学号',value:result['studentNumber']});
    list.push({"name":'形式',value:result['form']});
    list.push({"name":'入学时间',value:result['enrollmentTime']});
    list.push({"name":'学制',value:result['schoolSystem']});
    list.push({"name":'类型',value:result['type']});
    list.push({"name":'学籍状态',value:result['status']});

    bottom.push({"name":'在线验证码',value:result['onlineVerificationCode']});
    bottom.push({"name":'更新日期',value:result['updateDate']});
    send(res, {...result,"top":list,"bottom":bottom}, 200);
});


module.exports = router;
