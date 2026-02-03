$(document).ready(function (){
    $(".write-review").click(function () {
        const modalId = $(this).data("modal"); 
        $(`#${modalId}`).fadeIn();
    });

    $(".close").click(function () {
        $(this).closest(".write-review-modal").fadeOut();
    });
})

