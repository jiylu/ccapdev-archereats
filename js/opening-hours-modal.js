$(document).ready(function(){
    $(".see-hours").click(function(){
        $(".opening-hours-modal").fadeIn(200);
    });

    $(".close-btn").click(function () {
        $(".opening-hours-modal").fadeOut(200);  
    });
});