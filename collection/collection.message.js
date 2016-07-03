var Ut = require("../util/common.common.js");
var logger = require("../util/common.logger.js").logger('app');
var Val = require("../util/common.validate.js");
var MsgCode = require("../util/common.msgcode.js");
var MessageInfo = require('../model/model.message.js');
var pager = require('../model/model.pager.js');
var ReplyInfo = require('../model/model.reply.js');
var StaffInfo = require('../model/model.staff_info.js');
var messageCtrl = {};

/*微博列表*/
messageCtrl.getMessageAll = function (req, res) {
    var q = req.query;
    var pageCurrent = q.pageCurrent;
    if(pageCurrent==undefined||pageCurrent==null) {
        pageCurrent = 1;
    }
    var pageMhName = q.pageMhName;
    if(pageMhName==undefined||pageMhName==null) {
        pageMhName = '';
    }
    pager.pageMhName = pageMhName;
    pager.isPage = '0';
    MessageInfo.getMessageAll(pager, function (err, result) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        pager.maxNum = result.length;
        pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
        pager.pageStart = (parseInt(pageCurrent) - 1) * parseInt(pager.pageSize);
        pager.isPage = '1';
        MessageInfo.getMessageAll(pager, function (err, result1) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            pager.pagePath = 'index?';
            pager.pageCurrent = pageCurrent;
            pager.pageResult = result1;
            req.pager = pager;
            MessageInfo.getHotKey(function(err,key){
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }
                req.hotkey = key;
                return res.render('messageList', req);

            })

        });

    });
}

/*微博列表*/
messageCtrl.getMessageByStaff = function (req, res) {
    var q = req.query;
    var pageCurrent = q.pageCurrent;
    if(pageCurrent==undefined||pageCurrent==null) {
        pageCurrent = 1;
    }
    var staff_id = q.staff_id;
    if(staff_id==undefined||staff_id==null){
        staff_id = req.cookies.user.id;
    }

    pager.staff_id = staff_id;
    pager.isPage = '0';
    MessageInfo.getMessageByStaff(pager, function (err, result) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        pager.maxNum = result.length;
        pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
        pager.pageStart = (parseInt(pageCurrent) - 1) * parseInt(pager.pageSize);
        pager.isPage = '1';
        MessageInfo.getMessageByStaff(pager, function (err, result1) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            pager.pagePath = 'main?';
            pager.pageCurrent = pageCurrent;
            pager.pageResult = result1;
            req.pager = pager;
            MessageInfo.getHotKey(function(err,key){
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }
                req.hotkey = key;
                StaffInfo.getStaffDetail(staff_id,function(err,detail){
                    if (err) {
                        req.errorMsg = JSON.stringify(MsgCode.E1001);
                        res.render('page-error', req);
                        return;
                    }
                    req.headIcon = detail[0].headIcon;
                    req.nickname = detail[0].nickname;
                    return res.render('main', req);

                })

            })

        });

    });
}
/*微博详情页+热搜列表*/
messageCtrl.getMessageDetail = function (req, res) {
    var q = req.query;
    var pageCurrent = q.pageCurrent;
    if(pageCurrent==undefined||pageCurrent==null) {
        pageCurrent = 1;
    }
    MessageInfo.getCount(q.message_id, function (err, count) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        var count = parseInt(count[0].readcount) + 1;
        MessageInfo.upReadCount(count, q.message_id, function (err, result) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            MessageInfo.getMessageDetail(q.message_id, function (err, message) {
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }

                req.messageDetail = message[0];
                pager.isPage = '0';
                ReplyInfo.getReplyAll(q.message_id, pager, function (err, reply) {
                    if (err) {
                        req.errorMsg = JSON.stringify(MsgCode.E1001);
                        res.render('page-error', req);
                        return;
                    }
                    pager.maxNum = reply.length;
                    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
                    pager.pageStart = (parseInt(pageCurrent) - 1) * parseInt(pager.pageSize);
                    pager.isPage = '1';
                    ReplyInfo.getReplyAll(q.message_id, pager, function (err, reply) {
                        if (err) {
                            req.errorMsg = JSON.stringify(MsgCode.E1001);
                            res.render('page-error', req);
                            return;
                        }
                        pager.message_id = q.message_id;
                        pager.pageCurrent = pageCurrent;
                        pager.pagePath = 'getMessageDetail?';
                        pager.pageResult = reply;
                        req.pager = pager;
                        MessageInfo.getHotKey(function(err,key){
                            if (err) {
                                req.errorMsg = JSON.stringify(MsgCode.E1001);
                                res.render('page-error', req);
                                return;
                            }
                            req.hotkey = key;
                            return res.render('messageDetail', req);

                        })

                    });

                });
            });

        });
    });

}
/*wode 微博详情页+热搜列表*/
messageCtrl.getMainDetail = function (req, res) {
    var q = req.query;
    var pageCurrent = q.pageCurrent;
    if(pageCurrent==undefined||pageCurrent==null) {
        pageCurrent = 1;
    }
    var staff_id = q.staff_id;
    if(staff_id==undefined||staff_id==null){
        staff_id = req.cookies.user.id;
    }

    pager.staff_id = staff_id;
    MessageInfo.getCount(q.message_id, function (err, count) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }
        var count = parseInt(count[0].readcount) + 1;
        MessageInfo.upReadCount(count, q.message_id, function (err, result) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            MessageInfo.getMessageDetail(q.message_id, function (err, message) {
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }

                req.messageDetail = message[0];
                pager.isPage = '0';
                ReplyInfo.getReplyAll(q.message_id, pager, function (err, reply) {
                    if (err) {
                        req.errorMsg = JSON.stringify(MsgCode.E1001);
                        res.render('page-error', req);
                        return;
                    }
                    pager.maxNum = reply.length;
                    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
                    pager.pageStart = (parseInt(pageCurrent) - 1) * parseInt(pager.pageSize);
                    pager.isPage = '1';
                    ReplyInfo.getReplyAll(q.message_id, pager, function (err, reply) {
                        if (err) {
                            req.errorMsg = JSON.stringify(MsgCode.E1001);
                            res.render('page-error', req);
                            return;
                        }
                        pager.message_id = q.message_id;
                        pager.pageCurrent = pageCurrent;
                        pager.pagePath = 'getMainDetail?';
                        pager.pageResult = reply;
                        req.pager = pager;
                        MessageInfo.getHotKey(function(err,key){
                            if (err) {
                                req.errorMsg = JSON.stringify(MsgCode.E1001);
                                res.render('page-error', req);
                                return;
                            }
                            req.hotkey = key;
                            StaffInfo.getStaffDetail(staff_id,function(err,detail){
                                if (err) {
                                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                                    res.render('page-error', req);
                                    return;
                                }
                                req.headIcon = detail[0].headIcon;
                                req.nickname = detail[0].nickname;
                                return res.render('mainDetail', req);

                            })

                        })

                    });

                });
            });

        });
    });

}

/*添加回复信息*/
messageCtrl.addReply = function (req, res) {
    var b = req.body;
    b.staff_id = req.cookies.user.id;
    MessageInfo.getCount(b.message_id, function (err, count) {
        if (err) {
            req.errorMsg = JSON.stringify(MsgCode.E1001);
            res.render('page-error', req);
            return;
        }

        var count = parseInt(count[0].replycount) + 1;
        MessageInfo.upReplyCount(count, b.message_id, function (err, result) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            ReplyInfo.addReply(b, function (err, message) {
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }
                return res.redirect('getMessageDetail?message_id=' + b.message_id);
            });

        })
    })

}

/*添加发文*/
messageCtrl.addMessage = function (req, res) {
    var b = req.body;
    b.staff_id = req.cookies.user.id;
    if( req.files.img!=null&& req.files.img!=''){
        var path = req.files.img.path;
        var hzname = req.files.img.name;
        Ut.getImgPath(path, hzname, function (err, imgurl) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E5005);
                res.render('page-error', req);
                return;
            }
            b.imgurl = imgurl;
            MessageInfo.addMessage(b, function (err, message) {
                if (err) {
                    req.errorMsg = JSON.stringify(MsgCode.E1001);
                    res.render('page-error', req);
                    return;
                }
                return res.redirect('index');
            });
        });

    }else{
        b.imgurl = '';
        MessageInfo.addMessage(b, function (err, message) {
            if (err) {
                req.errorMsg = JSON.stringify(MsgCode.E1001);
                res.render('page-error', req);
                return;
            }
            return res.redirect('index');
        });
    }


}


module.exports = messageCtrl;