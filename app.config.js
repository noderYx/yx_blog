// 全局的应用参数配置，包括监听端口，默认路径，业务服务器地址，数据库配置等
var mysql = require('mysql');

appCfg = {};

var dbconfig = {
    user: 'sa',
    password: 'saadmin',
    host: '192.168.1.113',
    database: 'micro-blog-yx'
}



appCfg.sqlExc = function (sql, next) {
    var db = mysql.createConnection(dbconfig);
    db.connect();
    db.query(sql, function (err, rows) {
        if (err) {
            console.log('error');
            return next(err);
        }
        db.end();
        next(null, rows);
    });

}


appCfg.url_root = '/blog';

// 全局的文件根目录
appCfg.dir_root = __dirname;

// 导出的appCfg对象为只读
module.exports = Object.freeze(appCfg);




