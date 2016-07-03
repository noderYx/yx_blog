function main(){
    var user = $.cookie("user");
    if (user == null || user == '' || user == undefined) {
        alert("请先登录或者注册");
        return false;
    }else{
        window.location.href = "main";
    }

}