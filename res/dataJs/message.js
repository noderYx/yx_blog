

function validate() {
    var user = $.cookie("user");
    if (user == null || user == '' || user == undefined) {
        alert("请先登录或者注册");
        window.location.href = "login";
    }else{
        var preview = $("#preview").attr("src");
        if(preview!=''){
            var doc = $("#doc").val();
            var arr = doc.split(".");
            var der = arr[arr.length - 1];
            der = der.toUpperCase();

            if (der != '' && der != 'JPG' && der != 'JPEG' && der != 'PNG' && der != 'GIF') {
                alert('格式不正确，请重新选择！');
                return;
            }
        }
        var title = $("#title").val();
        var contents = $("#contents").val();
        if (title == '') {
            alert('请输入文章标题');
            return;
        }
        if (title.length>100 ) {
            alert('文章标题过长');
            return;
        }
        if (contents == '') {
            alert('请输入内容');
            return;
        }
        window.form1.submit();
    }


}

function setImagePreview(avalue) {
    var docObj=document.getElementById("doc");

    var imgObjPreview=document.getElementById("preview");
    if(docObj.files &&docObj.files[0])
    {
//火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '300px';
        imgObjPreview.style.height = '180px';
//imgObjPreview.src = docObj.files[0].getAsDataURL();

//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    }
    else
    {
//IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
//必须设置初始大小
        localImagId.style.width = "300px";
        localImagId.style.height = "180px";
//图片异常的捕捉，防止用户修改后缀来伪造图片
        try{
            localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        }
        catch(e)
        {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}