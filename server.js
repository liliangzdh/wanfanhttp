const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

const arr = require('./json/detail.json');

app.use(express.static('public'));
app.use(express.static('files'));

app.use('/', require('./router/api.js'));

app.set('views', './public/html');
//设置html模板渲染引擎
app.engine('html', ejs.__express);
//设置渲染引擎为html
app.set('view engine', 'html');
//
// //调用路由，进行页面渲染
app.get('/details/detail.do', function (request, response) {
    let result = null;
    for (let bean of arr) {
        if (bean.id === request.query.id) {
            result = bean;
            break;
        }
    }
    //调用渲染模板
    response.render('detail', {
        //传参
        keywordArr: result ? result.keywordArr : ['建筑工程12', "建筑工程质量", "质量管理"],                 // 关键字
        username: result ? result.username : '海东博',                // 作者
        company: result ? result.company : '江西理工大学',            // 作者单位
        serialTitle: result ? result.serialTitle : '工业C',              // 刊名
        year: result ? result.year : '2019',                    // 年：
        periods: result ? result.periods : '099',                  // (期)：
        classificationNumber: result ? result.classificationNumber : 'TU713.3', //分类号
        numberPages: result ? result.numberPages : '200',              //页数
        page: result ? result.page : '100',                     // 页码
    });

});


app.listen(3000, () => {
    console.log('服务启动成功');
});
