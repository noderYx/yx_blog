/* 
  全局的服务接口返回码定义
  参考微信公众平台开发接口：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
*/

var ServiceCode = {
  E0: '请求成功',
  E1001: '查询数据库失败',
  E1002: '添加数据库失败',
  E1003: '修改数据库失败',
  E1004: '删除数据库失败',
  E1005: '数据库连接超时',
  E1006: '分页查询失败',
  E3003: '验证数据库失败',
  E3004: '您的使用权限已经被停用',
  E2001: '您的产品已经超过有效期，请及时充值',
  E3001: '您的操作不合法，请重新操作',
  E3002: '您的参数中有非法字符',
  E4001: '用户名或密码失败',

  
  E4102: '缺少radioid参数',
  E4103: '缺少openid参数',
  E4104: '缺少请求参数',
  E4201: '解析JSON内容错误',

  E5001: '您的上传的文件不是图片',
  E5002: '你的字段中有中文',
  E5003: '你的网址不合法',
  E5004: '未授权的请求',
  E5005: '图片上传失败',
  E5006: '文件生成失败',
  E5007: '删除图片失败',
  E6001: '系统错误'
};

// 初始化函数： 将上述预定义的错误码，转换为json对象，例如：
// ServiceCode.E4001 对应的将是 { errcode: 4001, errmsg: '没找到对象' }
var init = function () {
  if (ServiceCode.E0 == '请求成功') {
    for (var key in ServiceCode) {
      if (key.indexOf('E') == 0) {
        var code = parseInt(key.substr(1));

        var item = {
          errcode: code,
          errmsg: ServiceCode[key]
        };

        ServiceCode[key] = Object.freeze(item);
      }
    }
  }
}

init();

ServiceCode.gen = function (code, msg) {
  if (!code || !msg) {
    return ServiceCode.E6001;
  }

  var data = {
    errcode: code,
    errmsg: msg
  };

  return data;
}

module.exports = Object.freeze(ServiceCode);
