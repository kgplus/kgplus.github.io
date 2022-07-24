jQuery(document).ready(function($) {
    $.ajax({
        type: "GET",
        url: emaar_ajax_script.ajaxurl,
        dataType: 'html',
        data: {
            action : 'get_properties_latest_launches'
        },
        success: function (res) {
            $('.latest-launches div.latest-launch').html(res);
            lazyload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
});