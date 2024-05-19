function showLoadingAnimation() {
  document.querySelector('.animbox').style.display = 'block';
  // 显示文本
  document.getElementById('loadingText').style.display = 'block';
}
function hideLoadingAnimation() {
  document.querySelector('.animbox').style.display = 'none';
  // 隐藏文本
  document.getElementById('loadingText').style.display = 'none';
}


function typeWriterEffect(text, elementId, typingDelay = 100) {
  let currentIndex = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = ''; // 清空现有文本，并使用innerHTML以便于后续插入<br>作为换行

  function typing() {
    if (currentIndex < text.length) {
      // 检查当前字符是不是换行符
      if (text.charAt(currentIndex) === '\n') {
        // 是换行符，添加<br>到innerHTML以实现换行效果
        element.innerHTML += '<br>';
      } else {
        // 不是换行符，直接添加字符
        element.innerHTML += text.charAt(currentIndex);
      }

      currentIndex++;
      setTimeout(typing, typingDelay);
    }
  }

  typing(); // 开始打字效果
}


document.getElementById('report').addEventListener('click', function() {
    console.log('Click event triggered');
    // 显示加载动画和文本
    showLoadingAnimation();

    const data1 = JSON.stringify(window.chatdata1);
    const data2 = JSON.stringify(window.chatdata2);

    fetch(`/chat?data1=${encodeURIComponent(data1)}&data2=${encodeURIComponent(data2)}`)
    .then(response => response.json())
    .then(chatdata => {
        console.log('请求')
        // 隐藏加载动画和文本
        hideLoadingAnimation();

         const content = chatdata.choices[0].message.content;
        typeWriterEffect(content, 'chat', 20);
    })
    .catch(error => {
        // 请求失败也要隐藏加载动画和文本
        hideLoadingAnimation();
        console.error('Request failed:', error);
    });
});