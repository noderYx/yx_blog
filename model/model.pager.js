/*
 分页的方法封装
 */
var pager = {
    pageCurrent:1,    //当前页页数
    pageCount:0,      //总页数
    pageSize:5,       //每页最大条数
    maxNum:0,       //总记录数
    pagePath:"pagePath",   //当前路由的路径
    pageResult:"pageResult" ,  //当前页信息
    pageMhName:"pageMhName"  , //当前页信息
    isPage:'0'  , //当前页信息
    pageStart:"pageMhName"  //当前页信息
};

module.exports = pager;
