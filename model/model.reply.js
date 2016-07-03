
var Ut = require("../util/common.common.js");
var appCfg = require("../app.config.js");
var mysql = require("mysql");

/*回帖信息*/
var reply = {}


/*
 * 回帖列表
 */
reply.getReplyAll = function (message_id,pager,callback) {
    var sql = "select s.nickname,r.* ,s.headIcon from reply r,staff_info s where r.staff_id = s.staff_id and r.message_id = ?";
    var sqlPage = "select s.nickname,r.* ,s.headIcon from reply r,staff_info s where r.staff_id = s.staff_id and r.message_id = ? order by r.replytime asc limit ?,?";

    if(pager.isPage=='1'){

        var sqlCmd =  mysql.format(sqlPage,[message_id,pager.pageStart,pager.pageSize]);
    }else{
        var sqlCmd = mysql.format(sql,[message_id]);
    }
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}

/*
 *回帖
 */
reply.addReply = function (insertJson,callback) {
    var sql = "INSERT INTO reply( contentss,message_id,staff_id) values (?,?,?)";
    var sqlCmd = mysql.format(sql,[insertJson.contentss,insertJson.message_id,insertJson.staff_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });

}


module.exports = reply;