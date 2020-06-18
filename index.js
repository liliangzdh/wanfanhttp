const express = require('express');
const fs = require('fs');
const ejs=require('ejs');
const app = express();


app.use(express.static('public'));
app.use(express.static('files'));


// /details/detail.do?_type=perio&id=QKV20152016072500148128
app.get('/details/detail.do',function (req, res) {
    console.log(12,req.query);
    // res.send("my body");
    res.writeHead(200, {'Content-Type': 'text/html'});
    // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
    fs.readFile('./public/html/1.html', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        data = data.replace("2015,(028)","2019,(027)");
        data = data.replace("周胜男","王业军");
        data = data.replace("安徽水安建设集团股份有限公司,安徽 230601","江西南昌有限公司，江西249000");
        res.end(data);
    });
});

app.get('/user',function (req,res) {
    res.send("usr");
});

app.listen(3000,()=>{
    console.log('服务启动成功');
});
