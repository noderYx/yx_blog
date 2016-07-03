var multer = require('multer')({ dest: './public/temp' });;
var Ut = require("../util/common.common.js");
var logger = require("../util/common.logger.js").logger('app');
var Val = require("../util/common.validate.js");
var MsgCode = require("../util/common.msgcode.js");
var StaffInfo = require('../model/model.staff_info.js');

var staffCtrl = {};

/*登录验证*/
staffCtrl.login = function (req, res) {
    var b = req.body;
    StaffInfo.login(b, function (err, staffinfo) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if (staffinfo.length>0) {

            //存储cookie
            var date = new Date();
            date.setTime(date.getTime() + 30* 60 * 1000); //设置date为当前时间+30分
            var user = {};
            user.name = staffinfo[0].nickname;
            user.id = staffinfo[0].staff_id;
            res.cookie('user', user);
            return res.redirect('index');

        } else {
            req.msg = JSON.stringify(MsgCode.E4001);
            return res.render('login', req);
        }
    });

}

//获取头像
staffCtrl.getHeadIcon = function (req, res) {
    var q = req.query;
    Ut.getConsole(">>>>>>>");
    StaffInfo.getHeadIcon(q,function (err, staffinfo) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if(staffinfo.length>0&&staffinfo[0].headIcon!=''){
            Ut.getConsole(staffinfo[0].headIcon);
            res.send(staffinfo[0].headIcon);

        }else{
            res.send('no');
        }

    });
}


/*注册*/
staffCtrl.addStaff = function (req, res) {
    var b = req.body;
    b.staff_id = req.cookies.user.id;
    var path = req.files.headicon.path;
    var hzname = req.files.headicon.name;
    Ut.getImgPath(path, hzname, function (err, headicon) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E5005);
            res.render('page-error', req);
            return;
        }
        b.headIcon = headicon;
        StaffInfo.addStaff(b,function (err, message) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            return res.redirect('index');
        });
    });

}

/*重置*/
staffCtrl.resetPassword = function (req, res) {
    var b = req.body;
    req.mobile = b.mobile;
    req.qq = b.qq;
    StaffInfo.getConfirm(b,function (err, info) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if(info.length>0){
            StaffInfo.resetPassword(b,function (err, message) {
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }
                req.msg = '1';
                return res.render('resetpwd', req);
            });

        }else{
            req.msg = '0';
            return res.render('resetpwd', req);
        }
    });
}

/*密码修改*/
staffCtrl.updatePassword = function (req, res) {
    var b = req.body;
    b.staff_id = req.cookies.user.id;
    StaffInfo.updatePassword(b,function (err, message) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        return res.redirect('index');
    });


}


/*验证手机号*/
staffCtrl.getMobile = function (req, res) {
    var b = req.body;
    StaffInfo.getMobile(b,function (err, message) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if(message.length>0&&message[0].mobile!=''){
            res.send('you');

        }else{
            res.send('no');
        }

    });


}


/*验证qq*/
staffCtrl.getQQ = function (req, res) {
    var b = req.body;
    StaffInfo.getQQ(b,function (err, message) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if(message.length>0&&message[0].qq!=''){
            res.send('you');

        }else{
            res.send('no');
        }

    });


}

/*验证nickname*/
staffCtrl.getNickName = function (req, res) {
    var b = req.body;
    StaffInfo.getNickName(b,function (err, message) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        if(message.length>0&&message[0].nickname!=''){
            res.send('you');

        }else{
            res.send('no');
        }

    });


}



module.exports = staffCtrl;