var mysql = require("mysql");
var Ut = require("../util/common.common.js");
var appCfg = require("../app.config.js");
var md5 = require('../util/common.md5.js');

/*用户信息*/
var staffInfo = {}

/*
 * 用户登陆
 */
staffInfo.login = function (b, callback) {
    var password = md5.md5(b.password).toUpperCase();
    var sql = 'select * from staff_info where qq = ? and password = ?';
    var sqlCmd = mysql.format(sql, [b.qq, password]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    })
}

/*
 *详情
 */
staffInfo.getStaffDetail = function (staff_id, callback) {
    var sql = "select * from staff_info  where staff_id = ?";
    var sqlCmd = mysql.format(sql, [staff_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
};
/*
 * 获取用户头像
 */
staffInfo.getHeadIcon = function (q, callback) {
    var sql = "select * from staff_info where qq = ?";
    var sqlCmd = mysql.format(sql, [q.qq])
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    })
}

/*
 * 用户注册
 */
staffInfo.addStaff = function (insertJson, callback) {
    var password = md5.md5(insertJson.password).toUpperCase();
    var sql = "insert into staff_info(mobile,nickname,password,headIcon,qq) values (?,?,?,?,?)";
    var sqlCmd = mysql.format(sql, [insertJson.mobile, insertJson.nickname, password, insertJson.headIcon, insertJson.qq]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}

/*
 * 重置密码
 */
staffInfo.resetPassword = function (b, callback) {
    var password = md5.md5('111111').toUpperCase();
    var sql = "update staff_info set password = ? where mobile = ? and qq = ?";
    var sqlCmd = mysql.format(sql, [password, b.mobile, b.qq]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}
/*忘记密码*/
staffInfo.getConfirm = function (b, callback) {
    var sql = "select * from staff_info where mobile = ? and qq = ?";
    var sqlCmd = mysql.format(sql, [b.mobile, b.qq]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}

/*
 * 修改密码
 */
staffInfo.updatePassword = function (b, callback) {
    //var password = md5.md5(password1).toUpperCase();
    var sql = "update staff_info set password = ? where staff_id=?";
    var sqlCmd = mysql.format(sql, [b.password, b.staff_id]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, 'ok');
    });
}

/*
 *验证qq
 */
staffInfo.getQQ = function (b, callback) {
    var sql = "SELECT * FROM staff_info WHERE qq=? ";
    var sqlCmd = mysql.format(sql, [b.qq]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}


/*
 *验证mobile
 */
staffInfo.getMobile = function (b, callback) {
    var sql = "SELECT * FROM staff_info WHERE mobile=? ";
    var sqlCmd = mysql.format(sql, [b.mobile]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}
/*
 *验证nickname
 */
staffInfo.getNickName = function (b, callback) {
    var sql = "SELECT * FROM staff_info WHERE nickname=? ";
    var sqlCmd = mysql.format(sql, [b.nickname]);
    appCfg.sqlExc(sqlCmd, function (err, result) {
        if (err) {
            Ut.getError('db error: ' + sqlCmd + '; ' + err);
            return callback(err);
        }
        callback(null, result);
    });
}


module.exports = staffInfo;