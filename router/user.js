/**
 * Created by liliang on 2020/6/23
 */

const router = require('express').Router();
const arr = require('../json/detail.json');
const send = require('../util/responseUtils');

const dev = false;
// api/user
router.get('/', function (req, res) {
    let min = 0;
    const letter = "ABCDEFGHIJKLMNOPQRSTUWXYZ123456789";
    let max = letter.length - 1;
    let temp = '';
    for (let i = 0; i < 16; i++) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        temp += letter[rand];
    }
    res.send(temp);
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

    let list = [];
    const bottom = [];

    list.push({"name": '入学时间', value: result['enrollmentTime']});
    list.push({"name": '毕业时间', value: result['graduationTime']});
    list.push({"name": '学校名称', value: result['university']});
    list.push({"name": '专业', value: result['major']});
    list.push({"name": '学历类别', value: result['type']});
    list.push({"name": '学制', value: result['schoolSystem']});
    list.push({"name": '学习形式', value: result['form']});

    list.push({"name": '层次', value: result['arrangement']});
    list.push({"name": '证书编号', value: result['certificateNumber']});
    list.push({"name": '毕(结)业', value: result['status']});
    list.push({"name": '校(院)长姓名', value: result['nameOfPrincipal']});

    bottom.push({"name": '在线验证码', value: result['onlineVerificationCode']});
    bottom.push({"name": '更新日期', value: result['updateDate']});


    let temp = [];
    for (let bean of list) {
        if (bean.value) {
            temp.push(bean);
        }
    }

    list = temp;


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
        avatar: encodeURI(result.avatar),
        list:list,
        bottom:bottom,
    };
    //调用渲染模板
    response.render('info', bean);

});

// 微信小程序 头部获取
// 是否 含有 这个 code。
router.get('/tip', function (req, res) {



    if (dev) {
        send(res, {
            "logo": '/images/logo.png',
            "title": '学新网二维码结果获取',
            "content": "可以获取任何二维码结果，并显示",
            "hostname ": req.hostname,
        }, 200);
    } else {
        send(res, {
            "logo": '/images/logo.png',
            "title": '学信网二维码结果获取',
            "content": "扫描验证高等教育学籍学历在线验证报告、学历认证报告以及相关教育背景报告真伪，请勿使用其他第三方程序扫描，以免上当受骗。",
            "hostname ": req.hostname,
        }, 200);
    }
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


    if (dev) {
        list.push({"name": '身高', value: '170'});
        list.push({"name": '层次', value: '本科'});
        list.push({"name": '体重', value: '132'});
        list.push({"name": '婚姻', value: '已婚'});

        // bottom.push({"name":'验证码',value:result['onlineVerificationCode']});
        // bottom.push({"name":'日期',value:result['updateDate']});
    } else {
        list.push({"name": '入学时间', value: result['enrollmentTime']});
        list.push({"name": '毕业时间', value: result['graduationTime']});
        list.push({"name": '学校名称', value: result['university']});
        list.push({"name": '专业', value: result['major']});
        list.push({"name": '学历类别', value: result['type']});
        list.push({"name": '学制', value: result['schoolSystem']});
        list.push({"name": '学习形式', value: result['form']});

        list.push({"name": '层次', value: result['arrangement']});
        list.push({"name": '证书编号', value: result['certificateNumber']});
        list.push({"name": '毕(结)业', value: result['status']});
        list.push({"name": '校(院)长姓名', value: result['nameOfPrincipal']});


        bottom.push({"name": '在线验证码', value: result['onlineVerificationCode']});
        bottom.push({"name": '更新日期', value: result['updateDate']});


        let temp = [];
        for (let bean of list) {
            if (bean.value) {
                temp.push(bean);
            }
        }

        list = temp;
    }

    send(res, {...result, "top": list, "bottom": bottom, "hostname ": req.hostname, "dev": dev}, 200);
});


module.exports = router;
