$(function () {
    var msg = $("#msg").val();
    if(msg!=''){
        $("#mobile").val($("#mobile1").val());
        $("#qq").val($("#qq1").val());

    }
    if (msg == '0') {

        alert('手机号与qq未绑定');

    }
    if (msg == '1') {
        $("#main").css("display",'block');
        alert('您的密码为：111111');

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
            success: function (src) {
                if (src != 'you') {
                    $(".avtar img").attr("src", src);
                }
            }
        });
    }

}

function validate() {
    var qq = $("#qq").val();
    var mobile = $("#mobile").val();
    var jian = mobile.indexOf('-');
    var jia = mobile.indexOf('+');

    if (qq == '') {
        alert('请输入qq账号');
        return;
    }
    if (mobile == '') {
        alert('请输入手机号码');
        return;
    }
    if (isNaN(mobile) || jian == 0 || jia == 0||mobile.length!=11) {
        alert('请输入正确格式的手机号码');
        return;
    }
    window.form1.submit();

}