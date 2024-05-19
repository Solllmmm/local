// 用于缓存页面内容的对象
var pageCache = {};

$('a.ajax-link').on('click', function(e) {
    e.preventDefault();

    var url = $(this).attr('href'); // 获取链接的href属性
    // 检查缓存中是否已有这个页面的内容
    if (pageCache[url]) {
        // 直接使用缓存的内容更新mainbox div
        $('.mainbox').html(pageCache[url]);
    } else {
        // 使用AJAX加载内容
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                // 将新内容更新到mainbox div
                $('.mainbox').html(response);
                // 将加载的内容添加到缓存中
                pageCache[url] = response;
            },
            error: function() {
                alert('Content could not be loaded.');
            }
        });
    }
});

$(document).ready(function() {
    // 自动触发"主页"链接的点击事件
    $('#onepage').click();
});