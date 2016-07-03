var Ut = require("../util/common.common.js");
var appCfg = require("../app.config.js");
var mysql = require("mysql");

/*关注信息*/
var attention = {}

/*
 * 关注
 */
attention.getAttention = function (staff_id,attention_id,callback) {
    var sql = "insert into attention(staff_id,attention_id) value(?,?)";
    var sqlCmd = mysql.format(sql,[staff_id,attention_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}


/*
 * 取消关注
 */

attention.getCancel = function (staff_id,attention_id,callback) {
    var sql = "delete from attention where attention_id = ? and staff_id = ?";
    var sqlCmd = mysql.format(sql,[attention_id,staff_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}
/*
 * 某人的关注列表
 */
attention.getAttentionAll = function (staff_id,callback) {
    var sql = "select s.* from attention a,staff_info s where a.attention_id = s.staff_id and a.staff_id = ?";
    var sqlCmd = mysql.format(sql,[staff_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}




module.exports = attention;