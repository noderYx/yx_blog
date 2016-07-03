$(function () {
    var user = $.cookie("user");
    if (user == null || user == '' || user == undefined) {
        window.location.href = "login";
    }
})

 