let radioState = {};

$('.feedback-buttons input[type="radio"]').each(function() {
    if (this.checked) {
        radioState[this.name] = this;
    }
});

$(document).ready(function (){
    $(".write-review").click(function () {
        $(".write-review-modal").fadeIn(400);
    });

    $(".button-cancel").click(function () {
        $(".write-review-modal").fadeOut(200);
    });

    $('.feedback-buttons input[type="radio"]').on('click', function() {
        let groupName = $(this).attr('name');

        if (radioState[groupName] === this) {
            $(this).prop('checked', false); 
            radioState[groupName] = null;   // Clear the memory
        } else {
            radioState[groupName] = this;
        }
    });
})

