
jQuery(document).ready(function() {

    /*
        Background slideshow
    */
    $.backstretch([
      "assets/img/backgrounds/1.jpg"
    , "assets/img/backgrounds/2.jpg"
    , "assets/img/backgrounds/3.jpg"
    ], {duration: 3000, fade: 750});

    /*
        Tooltips
    */
    $('.links a.home').tooltip();
    $('.links a.blog').tooltip();

    /*
        Form validation
    */
    $('.register form').submit(function(){
        $(this).find("label[for='nickname']").html('nickname');
        $(this).find("label[for='repassword']").html('repassword');
        $(this).find("label[for='qq']").html('qq');
        $(this).find("label[for='mobile']").html('mobile');
        $(this).find("label[for='possword']").html('password');
        ////
        var nickname = $(this).find('input#nickname').val();
        var repassword = $(this).find('input#repassword').val();
        var qq = $(this).find('input#qq').val();
        var mobile = $(this).find('input#mobile').val();
        var password = $(this).find('input#password').val();
        if(nickname == '') {
            $(this).find("label[for='nickname']").append("<span style='display:none' class='red'> - Please enter your nickname.</span>");
            $(this).find("label[for='nickname'] span").fadeIn('medium');
            return false;
        }
        if(password == '') {
            $(this).find("label[for='password']").append("<span style='display:none' class='red'> - Please enter a valid password.</span>");
            $(this).find("label[for='password'] span").fadeIn('medium');
            return false;
        }
        if(repassword == '') {
            $(this).find("label[for='repassword']").append("<span style='display:none' class='red'> - Please enter your repassword.</span>");
            $(this).find("label[for='repassword'] span").fadeIn('medium');
            return false;
        }
        if(mobile == '') {
            $(this).find("label[for='mobile']").append("<span style='display:none' class='red'> - Please enter your mobile.</span>");
            $(this).find("label[for='mobile'] span").fadeIn('medium');
            return false;
        }

        if(qq == '') {
            $(this).find("label[for='qq']").append("<span style='display:none' class='red'> - Please enter a valid qq.</span>");
            $(this).find("label[for='qq'] span").fadeIn('medium');
            return false;
        }

    });


});


