$(document).ready(function() {
    const $container = $('#featCards');
    const scrollAmount = 320;

    $('.scroll-btn.left').on('click', function() {
        $container.animate({
            scrollLeft: $container.scrollLeft() - scrollAmount
        }, 400)
    });
    $('.scroll-btn.right').on('click', function() {
        $container.animate({
            scrollLeft: $container.scrollLeft() + scrollAmount
        }, 400)
    });
});