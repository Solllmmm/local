const fullmap={
		nm:'内蒙古自治区',
		hlj:'黑龙江省',
		jl:'吉林省',
		ln:'辽宁省',
		hb:'河北省',
		bj:'北京市',
		sx:'山西省',
		sd:'山东省',
		tj:'天津市',
		hen:'河南省',
		ah:'安徽省',
		js:'江苏省',
		shx:'陕西省',
		hn:'湖南省',
		hub:'湖北省',
		jx:'江西省',
		fj:'福建省',
		zj:'浙江省',
		gd:'广东省',
		sh:'上海市',
		cq:'重庆市',
		sc:'四川省',
		gz:'贵州省',
		yn:'云南省',
		gx:'广西壮族自治区	',
		qh:'青海省',
		gs:'甘肃省',
		xj:'新疆维吾尔自治区',
		xz:'西藏自治区',
		nx:'宁夏回族自治区',
		hnan:'海南省',

	}
    const categoryStyles = {
  '优': '#78ef94',
  '良': '#bfe8ad',
  '轻度污染': '#f3f677',
        '中度污染':'#f1a04d',
        '重度污染':'#c76460'

};

var scrollInterval;
function ll() {
    if(document.querySelectorAll('[class^="listItem category-"]')){
    //清空现在轮播数据的dom元素
    let elements = document.querySelectorAll('[class^="listItem category-"]');
    // 对获取到的每个元素执行删除操作
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.remove();
    }
    }
     if (scrollInterval) {
    clearInterval(scrollInterval);
  }
  let dataList = window.lunbo
  console.log(dataList)
  const dataListArray = Object.entries(dataList).map(([city, data]) => {
    return {city, data};
  });

  const columnLabelsDiv = document.createElement('div');
  if(document.querySelectorAll('[class="column-labels"]').length===0){
        columnLabelsDiv.className = 'column-labels';
        columnLabelsDiv.innerHTML = `
          <span class="city">城市</span>
          <span class="aqi">AQI</span>
          <span class="category">等级</span>
          <span class="primary">主要污染物</span>
        `;
 }
var scrollList = document.getElementById('echart2');
scrollList.parentElement.insertBefore(columnLabelsDiv, scrollList);

//排序
  dataListArray.sort((a, b) => b.data.aqi - a.data.aqi)
  rolldata = dataListArray.map(item => {
  // 返回对象而不是字符串
  return {
    fullCityName: fullmap[item.city] || item.city, // 全城市名
    aqi: item.data.aqi, // 空气质量指数
    category: item.data.category, // 空气质量分类
    primary: item.data.primary, // 主要污染物
    pubTime: item.data.pubTime // 发布时间
  };
});


  let offset = 0;
  let scrollRate = 1;
  let frameRate = 20;



// 轮询器函数，用于平滑滚动
  const scroller = () => {
    offset = (offset > scrollList.scrollHeight / 2) ? 0 : offset + scrollRate;
    scrollList.scrollTo(0, offset);
  };

// 添加重复的元素进行无缝滚动
   for (let i =0;i<4;i++){
       console.log(11111111111)
rolldata.forEach(item => {
  const div = document.createElement('div');
  div.className = `listItem category-${item.category}`;
  // 设置分类相关的背景色
//   div.style.backgroundColor = categoryStyles[item.category] || '#fff';

  // 创建内部 HTML 结构并设置实际值
  div.innerHTML = `
    <span class="city" >${item.fullCityName}</span>
    <span class="aqi" >${item.aqi}</span>
    <span class="category" >${item.category}</span>
    <span class="primary" >${item.primary}</span>
`;
  scrollList.appendChild(div);
})}



   scrollInterval = setInterval(scroller, 1000 / frameRate);

// 鼠标悬停暂停滚动
  scrollList.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
  });

// 鼠标移出恢复滚动
  scrollList.addEventListener('mouseleave', () => {
      clearInterval(scrollInterval);
    scrollInterval = setInterval(scroller, 1000 / frameRate);
  })
}



function ll1() {
    //清空现在轮播数据的dom元素
    let elements = document.querySelectorAll('[class^="listItem category-"]');
    // 对获取到的每个元素执行删除操作
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.remove();
    }

  let dataList = window.shengfengdata
  const dataListArray = dataList.map(item=>{
      return {
          city:item.city_name,
          aqi:item.xq.now.aqi,
          category: item.xq.now.category,
          primary:item.xq.now.primary
      }
  })

var scrollList = document.getElementById('echart2');


//排序
  dataListArray.sort((a, b) => b.aqi - a.aqi)

  let offset = 0;
  let scrollRate = 1;
  let frameRate = 20;



// 轮询器函数，用于平滑滚动
  const scroller = () => {
    offset = (offset > scrollList.scrollHeight / 2) ? 0 : offset + scrollRate;
    scrollList.scrollTo(0, offset);
  };



// 添加重复的元素进行无缝滚动
    for (let i=0;i<4;i++){
dataListArray.forEach(item => {
  const div = document.createElement('div');
  div.className = `listItem category-${item.category}`;
  // 设置分类相关的背景色
  // div.style.backgroundColor = categoryStyles[item.category] || '#fff';

  // 创建内部 HTML 结构并设置实际值
  div.innerHTML = `
    <span class="city">${item.city}</span>
    <span class="aqi">${item.aqi}</span>
    <span class="category">${item.category}</span>
    <span class="primary">${item.primary}</span>
  `;

  scrollList.appendChild(div);
})}

 // 清除旧的滚动间隔
  if (scrollInterval) {
    clearInterval(scrollInterval);
  }

  // 重新设置滚动间隔，只设置一次
  scrollInterval = setInterval(scroller, 1000 / frameRate);

  // 事件监听保持不变
  scrollList.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
  });

  scrollList.addEventListener('mouseleave', () => {
      clearInterval(scrollInterval);
    scrollInterval = setInterval(scroller, 1000 / frameRate);
  });
}


window.startll=ll
window.startll1=ll1