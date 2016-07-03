var Ut = require("./common.common.js");
/*
 全局的验证函数库
 -- 验证长度
 -- 验证是否为空
 -- 验证图片格式
 -- 验证是否是数字
 -- 验证网址是否符合要求
 */
var Validate = {
  //验证长度
  valLength: function (field, minlength, maxlength) {
    if (minlength <= field.length <= maxlength) {
      return true;
    }
    return false;
  },

  //验证是否为空
  valIsNull: function (a) {
    Ut.getConsole("a:"+a);
    if (a != null && a != "") {
      return true;
    }
    return false;
  },

  //验证图片格式
  valImgType: function (image) {
    var arr = image.split(".");
    var postfix = arr[arr.length - 1];
    postfix = postfix.toUpperCase();
    if (postfix != '' && postfix != 'JPG' && postfix != 'JPEG' && postfix != 'PNG' && postfix != 'GIF') {
      return false;
    }
    return true;
  },

  //验证是否是数字
  valNumber: function (number) {
     Ut.getConsole("number:"+number);
    var prefix1 = number.indexOf('-');
    var prefix2 = number.indexOf('+');
    
    if (isNaN(number) || prefix1 == 0 || prefix2 == 0) {
      return false;
    }
    return true;
  },

  //验证网址是否符合要求
  valUrl: function (adurl) {
    if (!/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/.test(adurl)) {
      return false;
    }
    return true;
  }
};

module.exports = Validate;
