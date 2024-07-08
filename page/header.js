$(document).ready(function() {
    $('#menu-toggle').click(function() {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
        $('#header-menu').toggleClass('active');
        $('.header-authentication').toggleClass('active');
    });
});
