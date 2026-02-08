$(document).ready(function () {
    $(".sign-in").click(function () {
        $(".login-modal").fadeIn(400);
    });

    $(".close-btn").click(function () {
        $(".login-modal").fadeOut(200);
        $(".register-modal").fadeOut(200);
    });

    $(".login-btn").click(function () {
        $(".login-modal").fadeOut(200);
    });

    $(".register").click(function (){
        $(".login-modal").fadeOut(200);
        $(".register-modal").fadeIn(200);
    });

    $(".login-account").click(function (){
        $(".register-modal").fadeOut(200);
        $(".login-modal").fadeIn(200);
    });

    $(".register-btn").click(function (){
        $(".register-modal").fadeOut(200);
    });
});