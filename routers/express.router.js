var express = require('express');
var https = require('https');
var url = require('url');
var fs = require('fs');
var async = require('async');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Ut = require("../util/common.common.js");
var StffCtrl = require("../collection/collection.staff_info.js");
var MessageCtrl = require("../collection/collection.message.js");

router.use(function (req, res, next) {
    // 检查所有get请求的参数是否是数据库关键字防止sql注入
    //判断当前数组中是否包含请求路径
    Array.prototype.contains = function (item) {
        return RegExp("\\b" + item + "\\b").test(this);
    };
    var path = req.path;
    var param = path.substr(1); //截图字符串
    var pages = ['/getMessageAll','/getMessageDetail'];
    if (req.method == 'GET' && pages.contains(param)) {
        var paramString = url.parse(req.url).query;
        if (paramString != null) {
            var checkDBKeyWord = Ut.checkDBKeyWord(paramString);
            if (checkDBKeyWord == false) {
                req.errorMsg = JSON.stringify(MsgCode.E3002);
                return res.render('page-error', req);
            }
        }
        return next();
    } else {
        return next();
    }
});

/*登录*/
router.get('/login', function (req, res) {
    req.msg = '';
    res.render("login", req);

});
/*登录*/
router.get('/signup', function (req, res) {
    req.msg = '';
    res.cookie('user','');
    res.render("login", req);

});

/*获取用户头像*/
router.get('/getHeadIcon', StffCtrl.getHeadIcon);

/*登录验证*/
router.post('/loginYZ', StffCtrl.login);


/*注册*/
router.get('/register', function (req, res) {
    res.render("register", req);

});

/*注册YZ*/
router.post('/addStaff',multipartMiddleware, StffCtrl.addStaff);

/*忘记密码*/
router.get('/resetpwd', function (req, res) {
    req.msg = '';
    req.qq = '';
    req.mobile = '';
    res.render("resetpwd",req);

});

router.post('/resetPassword', StffCtrl.resetPassword);

/*修改密码*/
router.get('/updatePassword', StffCtrl.updatePassword);

/*验证手机号*/
router.post('/getMobile', StffCtrl.getMobile);

/*验证qq*/
router.post('/getQQ', StffCtrl.getQQ);

/*验证nickname*/
router.post('/getNickName', StffCtrl.getNickName);


/*微博列表*/
router.get('/index', MessageCtrl.getMessageAll);

/*main*/
router.get('/main', MessageCtrl.getMessageByStaff);

/*我的详情*/
router.get('/getMainDetail', MessageCtrl.getMainDetail);

/*微博详情*/
router.get('/getMessageDetail', MessageCtrl.getMessageDetail);

/*发文*/
router.get('/sendMessage', function (req, res) {
    res.render("sendMessage");

});
router.post('/addMessage',multipartMiddleware, MessageCtrl.addMessage);

/*回复*/
router.post('/addReply', MessageCtrl.addReply);

module.exports = router;