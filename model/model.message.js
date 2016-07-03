var Ut = require("../util/common.common.js");
var appCfg = require("../app.config.js");
var util = require('util');
var mysql = require("mysql");

/*主贴信息*/
var message = {}


/*
 * 列表+热搜列表
 */
message.getMessageAll = function (pager,callback) {
    var sql = "select m.*,s.nickname,s.headIcon from message m ,staff_info s where m.staff_id = s.staff_id and m.title like '%"+pager.pageMhName+"%'";
    var sqlpage = "select m.*,s.nickname,s.headIcon from message m ,staff_info s where m.staff_id = s.staff_id and m.title like '%"+pager.pageMhName+"%' order by m.sendtime desc limit ?,?";
    if(pager.isPage=='1'){
        var sql =  mysql.format(sqlpage,[pager.pageStart,pager.pageSize]);
    }
    appCfg.sqlExc(sql, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sql + '; ' + err);
            return callback(err);
        }

        callback(null, result);
    });
}

/*
 * 某人的列表
 */
message.getMessageByStaff = function (pager,callback) {
    var sql = "select m.*,s.nickname,s.headIcon from message m ,staff_info s where m.staff_id = s.staff_id and  m.staff_id = "+pager.staff_id;
    var sqlpage = "select m.*,s.nickname,s.headIcon from message m ,staff_info s where m.staff_id = s.staff_id and  m.staff_id = ? order by m.sendtime desc limit ?,?";
    if(pager.isPage=='1'){
        var sql =  mysql.format(sqlpage,[pager.staff_id,pager.pageStart,pager.pageSize]);
    }
    appCfg.sqlExc(sql, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sql + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}


/*
 * 热搜关键字
 */
message.getHotKey = function (callback) {
    var sql = "select * from message m order by readcount desc  limit 4";
    appCfg.sqlExc(sql, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sql + '; ' + err);
            return callback(err);
        }

        callback(null, result);
    });
}


/*
 *查询单条
 */
message.getMessageDetail = function (message_id ,callback) {
    var sql = "SELECT m.*,s.nickname,s.headIcon FROM message m ,staff_info s where m.staff_id = s.staff_id and message_id = ?";
    var sqlCmd = mysql.format(sql,[message_id]);
    appCfg.sqlExc(sqlCmd , function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}


/*
 * 修改浏览次数
 */
message.upReadCount = function (readcount,message_id, callback) {
    var sql = "update message set readcount = ? where message_id = ?";
    var sqlCmd = mysql.format(sql,[readcount,message_id] );
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}

/*
 * 修改浏览次数、回复次数
 */
message.upReplyCount = function (replycount,message_id, callback) {
    var sql = "update message set replycount = ? where message_id = ?";
    var sqlCmd = mysql.format(sql,[replycount,message_id] );
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}


/*
 * 查询 浏览次数 回复次数
 */
message.getCount = function (message_id, callback) {
    var sql = "select * from  message where message_id = ?";
    var sqlCmd = mysql.format(sql,[message_id] );
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null,result);
    });
}



/*
 *发帖
 */
message.addMessage = function (insertJson,callback) {
    var sql = "INSERT INTO message(title, contents,staff_id,imgurl) values (?,?,?,?)";
    var sqlCmd = mysql.format(sql,[insertJson.title,insertJson.contents,insertJson.staff_id,insertJson.imgurl]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}


module.exports = message;