/**
 * Created by liliang on 2020/6/23
 */

function send(res, result, code) {
    let bean = {
        code: code,
        result: result,
    };
    res.send(JSON.stringify(bean));
}

module.exports = send;
