function validate() {
    var user = $.cookie("user");
    if (user == null || user == '' || user == undefined) {
        alert("请先登录或者注册");
        window.location.href = "login";
    }else{
        var contentss = $("#contentss").val();

        if (contentss == '') {
            alert('回复内容不能为空');
            return;
        }
        window.form1.submit();
    }



}

