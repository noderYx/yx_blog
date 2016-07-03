$(function () {
    var msg = $("#msg").val();
    if (msg != '') {

        alert(msg);

    }
})

function onblurMethod() {
    var qq = $("#qq").val();
    if (qq != '' && qq != null) {
        $.ajax({
            type: 'GET',
            url: "getHeadIcon",
            data: {'qq': qq},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (a) {
                //alert(src)
                if (a != 'no') {
                    $(".avtar img").attr("src", a);
                }else{
                    $(".avtar img").attr("src", 'res/login/images/avtar.png');
                }
            }
        });
    }

}

function validate() {
    var qq = $("#qq").val();
    var password = $("#password").val();
    if (qq == '') {
        alert('请输入qq账号');
        return;
    }
    if (password == '') {
        alert('请输入密码');
        return;
    }
    window.form1.submit();

}