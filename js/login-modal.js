$(document).ready(function () {
    $(".sign-in").click(function () {
        $(".login-modal").fadeIn(400);
    });

    $(".close-btn").click(function () {
        $(".login-modal").fadeOut(200);
    });

    $(".login-btn").click(function () {
        $(".login-modal").fadeOut(200);
    });
});