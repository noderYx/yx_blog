var http = require("http");
var fs = require('fs');
var urltool = require('url');
var formidable = require('formidable');
var logger = require("./common.logger.js").logger('app');
var md5 = require("./common.md5.js");
var appCfg = require("../app.config.js");
var ROOT_PATH = fs.realpathSync('.');
var Ut = {
  /*
  从当前页面url中解析请求参数
  示例： var radioid = Ut.QueryString("radioid");
  */
  queryString: function (key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
  },

  /*
  检查数据库关键字：防止sql注入
  示例： var checkDBKeyWord = Ut.checkDBKeyWord(paramString);
  */
  checkDBKeyWord: function (paramString) {
    var r, reg;         // 声明变量。
    reg = /and|or|exec|insert|select|union|update|count|delete/i;    // 创建正则表达式模式。
    r = paramString.match(reg);   // 尝试匹配搜索字符串。
    if (r != null && paramString != null) {
      return false;
    }
    return true;
  },

  /*
  删除url中包含的某个请求参数
  示例： var href = Ut.deleteParam(href, 'openid');
  */
  deleteParam: function (url, name) {
    var i = url;
    var reg = new RegExp("([&\?]?)" + name + "=[^&]+(&?)", "g")

    var newUrl = i.replace(reg, function (a, b, c) {
      if (c.length == 0) {
        return '';
      } else {
        return b;
      }
    });
    return newUrl;
  },

  /*
  控制所有的输出语句的开启和关闭
  示例：Ut.getConsole(message);
  */
  getConsole: function (message) {
    logger.info( message);
  },
  getError: function (message) {
    logger.error( message);
  },

  /*
  从当前页面url地址中去除openid，comopenid参数，生成用于微信分享的地址
  示例： var share_url = Ut.genShareUrl();
  */
  genShareUrl: function () {
    var href = document.location.href;
    href = Ut.deleteParam(href, 'openid');
    href = Ut.deleteParam(href, 'comopenid');
    return href;
  },

  /*
  生成一 down~up 的随机数
  示例： var num = Ut.random(100,200);//小数
         parseInt(num);//整数
  */
  random: function (up,down) {
    //Math.random() * (上限 - 下线 + 1) + 下线;
    return Math.random() * (up - down + 1) + down;
  },

  /*
    删除图片
    示例： var result =  Ut.deleteImgPath(oldPath);
  */
  deleteImgPath: function (oldPath) {
    if (oldPath == null) {
      return;
    }
    var uploadDir = __dirname + '/../' + oldPath;
    Ut.getConsole("deleteImgPath:" + uploadDir);
    fs.exists(uploadDir, function (exitImg) {
      if (exitImg) {
        fs.unlink(uploadDir, function (err) {
          if (err) {
            console.log('delete img successn');
            return;
          } else {
            console.log('delete img no');
            return;
          }
        });
      } else {
        console.log('image no exit');
        return;
      }
    });
  },


  /*
    上传图片
    示例： Ut.getImgPath(path,name,function(err,result){});
  */
  getImgPath: function (path, name, callback) {
    var uploadDir = __dirname + '/../res/upload/';
    var arr = name.split(".");
    var sjs = Math.random() * 1000;
    sjs1 = Math.round(sjs);
    var nowDate = Ut.nowDate();
    var url = nowDate + '-' + sjs1 + '.' + arr[arr.length - 1];
    //拼接新路径
    var newpath = uploadDir + url;
    //数据库存储路径
    var newpath1 = 'res/upload/' + url;
    //存储文件
    fs.readFile(path, function (err, data) {
      fs.writeFileSync(newpath, data, 'utf8');
      callback(null, newpath1)
    });
  },


  /*
    生成文件
    示例： Ut.getFilePath(model,function(err,result){});
  */
  getFilePath: function (model, callback) {
    var adRouter = appCfg.wds_server + appCfg.url_root + '/s';
    var id = md5.md5(model.id).toUpperCase();
    //生成js脚本内容
    var adjs = '$(function(){' +
                  'window.opener.location="' + adRouter + '?rsv_bp=' + id + '";' +
                '})';
    var nowDate = Ut.nowDate();
    var jsname = 'res/adjs/' + model.username + '-' + nowDate + '.js';
    //全名称
    var position = appCfg.wds_server + appCfg.url_root + '/' + jsname;
    //上传文件
    fs.writeFileSync(jsname, adjs, 'utf8');
    console.log('writeFileSync ok');
    var javascriptName = '<script type="text/javascript" src="' + position + '"></script>';
    callback(null, javascriptName);
  },

  /*
    判断文件夹是否存在
    示例： Ut.isex(path,function(err,result){});
  */
  isex: function (path, callback) {
    fs.exists(path, function (exists) {
      if (exists) {
        console.log("b文件夹存在");
        callback(null, 'ok');
      } else {
        console.log("b文件夹不存在");
        callback(null, 'no');
      }
    });
  },

  /*
    创建文件夹
    示例： Ut.mkfile(path,function(err,result){});
  */
  mkfile: function (path, callback) {
    console.log('创建wer1' + path);
    fs.mkdir(path, function (err) {
      if (!err) {
        console.log("操作成功！");
        callback(null, 'mkok');
      } else {
        console.log("操作失败！");
        callback(null, 'mkno');
      }
    });
  },

  /*
    读取指定文件
    示例： var file = Ut.readfile();
  */
  readfile: function (callback) {
    fs.exists(ROOT_PATH + '/views/wzf/iframe.ejs', function (exists) {
      if (exists) {
        str = fs.readFileSync(ROOT_PATH + '/views/wzf/iframe.ejs', 'utf8');
        if (str != undefined) {
          console.log(str);
          callback(null, str);
        }
      }
      else {
        logger.info('file not eixst: ' + ROOT_PATH + '/views/wzf/ticket.txt');
        callback(null, 'no');
      }
    });
  },

  /*
  生成格式化的当前时间: yyyy-MM-dd HH:mm:ss
  示例： var str = Ut.now();
  */
  now: function () {
    var fmtTwo = function (number) {
      return (number < 10 ? '0' : '') + number;
    }
    var date = new Date();
    var yyyy = date.getFullYear();
    var MM = fmtTwo(date.getMonth() + 1);
    var dd = fmtTwo(date.getDate());
    var HH = fmtTwo(date.getHours());
    var mm = fmtTwo(date.getMinutes());
    var ss = fmtTwo(date.getSeconds());
    return yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;
  },
  
  /*
  生成格式化的当前时间: yyyyMMddhhmmss
  示例： var str = Ut.formatterDateTime();
  */
  formatterDateTime: function () {
    var date = new Date();
    var dateTime = date.getFullYear()
           + ""// "年"
           + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
           + (date.getMonth() + 1))
           + ""// "月"
           + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
           + ""
           + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
           + ""
           + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
           + ""
           + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    return dateTime;
  },

  /*
    生成格式化的当前时间: 结果
    示例： var str = Ut.imgnow();
  */
  imgnow: function () {

    var date = new Date();
    var yyyy = date.getFullYear();
    var MM = date.getMonth() + 1;
    var dd = date.getDate();
    var HH = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return yyyy + MM + dd + HH + mm + ss;
  },

  /*
    生成格式化的当前时间: yyyy-MM-dd-HH-mm-ss
    示例： var str = Ut.nowDate();
  */
  nowDate: function () {

    var date = new Date();
    var yyyy = date.getFullYear();
    var MM = date.getMonth() + 1;
    var dd = date.getDate();
    var HH = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return yyyy + '-' + MM + '-' + dd + '-' + HH + '-' + mm + '-' + ss;
  },

   /*
    生成格式化的当前时间: yyyy-MM-dd
    示例： var str = Ut.today();
  */
  today: function () {
    // 将数字格式化为两位长度的字符串
    var fmtTwo = function (number) {
      return (number < 10 ? '0' : '') + number;
    }

    var date = new Date();

    var yyyy = date.getFullYear();
    var MM = fmtTwo(date.getMonth() + 1);
    var dd = fmtTwo(date.getDate());

    return yyyy + '-' + MM + '-' + dd;
  },

  /*
  从某个url地址获取json数据
  */
  getJSON: function (url, onResult) {
    http.get(url, function (res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        var obj = JSON.parse(data);
        onResult(obj);
      })
    }).on('error', function (e) {
      logger.error("http get error: " + e.message + ", url = " + url);
    });
  },

  /*
  向某个url地址post发送json数据
  */
  postJSON: function (url, postData, onResult) {
    var url_info = urltool.parse(url);
    var options = {
      hostname: url_info.hostname,
      port: url_info.port,
      path: url_info.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Content-Length': postData.length
      }
    };
    var req = http.request(options, function (res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        var obj = JSON.parse(data);
        onResult(obj);
      })
    });

    req.on('error', function (e) {
      logger.error("http post error: " + e.message + ", url = " + url);
    });

    // write data to request body
    req.write(postData);
    req.end();
  }
};

module.exports = Ut;
