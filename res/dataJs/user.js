function validate() {
    var nickname = $("#nickname").val();
    var password = $("#password").val();
    var repassword = $("#repassword").val();
    var mobile = $("#mobile").val();
    var jian = mobile.indexOf('-');
    var jia = mobile.indexOf('+');
    var preview = $("#preview").attr("src");
    var logo = $("#doc").val();
    var arr = logo.split(".");
    var der = arr[arr.length - 1];
    der = der.toUpperCase();
    var qq = $("#qq").val();
    if (nickname == '') {
        alert('请输入昵称');
        return;
    }
    else if (nickname.length >12||nickname.length<2) {
        alert('昵称长度必须在2~12之间');
        return;
    }
    else if (password == '') {
        alert('请输入QQ');
        return;
    }
    else if (password.length >8||password.length<6) {
        alert('密码长度必须在6~8之间');
        return;
    }
    else if (password != repassword) {
        alert('密码不一致');
        return;
    }

    else if (mobile == '') {
        alert('请输入手机号码');
        return;
    }
    else if (isNaN(mobile) || jian == 0 || jia == 0||mobile.length!=11) {
        alert('请输入正确格式的手机号码');
        return;
    }
    else if (qq == '') {
        alert('请输入QQ');
        return;
    }
    else if (qq.length <6||qq.lenth>12) {
        alert('QQ长度必须在6~12之间');
        return;
    }
    else if(preview==''){
        alert('请上传头像');
        return;
    }
    else if (der != '' && der != 'JPG' && der != 'JPEG' && der != 'PNG' && der != 'GIF') {
        alert('格式不正确，请重新选择！');
        return;
    }else{

        $.ajax({
            type: 'post',
            url: "getNickName",
            data: {'nickname': nickname},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (a) {
                if (a == 'you') {
                    alert("该昵称已经存在");

                    return false;
                }else{
                    $.ajax({
                        type: 'post',
                        url: "getMobile",
                        data: {'mobile': mobile},
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        success: function (b) {
                            if (b == 'you') {
                                alert("该手机号已经注册过了");
                                return false;
                            }else{
                                $.ajax({
                                    type: 'post',
                                    url: "getQQ",
                                    data: {'qq': qq},
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    success: function (c) {
                                        if (c== 'you') {
                                            alert("该QQ号已经注册过了");

                                            return false;
                                        }else{
                                            window.form1.submit();
                                        }
                                    }
                                });

                            }
                        }
                    });
                }
            }
        });
    }



}

function setImagePreview(avalue) {
    var docObj = document.getElementById("doc");

    var imgObjPreview = document.getElementById("preview");
    if (docObj.files && docObj.files[0]) {
//火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '100px';
        imgObjPreview.style.height = '100px';
//imgObjPreview.src = docObj.files[0].getAsDataURL();

//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    }
    else {
//IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
//必须设置初始大小
        localImagId.style.width = "100px";
        localImagId.style.height = "100px";
//图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        }
        catch (e) {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}