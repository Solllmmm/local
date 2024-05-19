$(document).ready(function (){
    fetch('/admin')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {
                let buttons = '';
                // 如果用户名不是 'admin'，则添加删除按钮
                if (item.user !== 'admin') {
                    buttons = `<button class="btn btn-danger deleteBtn" data-id="${item.id}">Delete</button>`;
                }
                // 构建表格行 HTML 字符串并添加相应的按钮
                $('#userTable').append(
                    `<tr id="userRow-${item.id}">
                        <td>${item.id}</td>
                        <td>${item.user}</td>
                        <td>${item.password}</td>
                        <td>${buttons}</td>
                    </tr>`
                );
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
});

$('#userTable').on('click', '.deleteBtn', function() {
    var dataid = $(this).data('id'); // 获取数据ID
    fetch(`/delete?id=${dataid}`)
        .then(response => {
            if (response.ok) {

                // 移除用户行
                $(`#userRow-${dataid}`).remove();
                // 显示成功消息
                displayMessage("用户删除成功", "success");
            } else {
                // 如果出现错误，显示错误消息
                displayMessage("删除出错 请重试", "error");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage("未知错误", "error");
        });
});

// 用来显示消息的函数，接受消息文本和类型（success或error）
function displayMessage(message, type) {
    var messageElement = $('#message');
    messageElement.text(message).css({
        "background-color": type === "success" ? "#28a745" : "#dc3545", // 绿色或红色
        "display": "block"
    });

    // 在显示消息几秒后将其隐藏
    setTimeout(function() {
        messageElement.fadeOut();
    }, 4000); // 4秒后消失

}