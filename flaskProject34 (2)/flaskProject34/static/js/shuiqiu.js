var chartDom = document.getElementById('shuiqiu');
var myChart = echarts.init(chartDom);
var option;


const sq=(city,date)=>{
    fetch(`/leida?city=${city}&date=${date}`)
    .then(response=>response.json())
        .then(data=>{
const ColorList = ['#E8FF94', '#89FEBA', '#5EDCEB', '#57A4FF', '#8E87FF','#57965C'] // 链群颜色值
const numberOfBubbles = 6; // 水球图的数量
const spacing = 100 / (numberOfBubbles + 1);

const recommendedValues = {
    pm2_5: 75, // WHO的推荐年均值
    pm10: 75,
    so2: 150, // 短期浓度
    no2: 80,
    co: 10, // 以 ppm 为单位
    o3: 160 // 8小时平均浓度
};

var arrayTemp = [
    {
        value: data['pm2_5'],
        name: 'pm2_5',
        num: 1,
    },
    {
        value: data['pm10'],
        name: 'pm10',
        num: 100,
    },
    {
        value: data['so2'],
        name: 'so2',
        num: 10,
    },
    {
        value: data['no2'],
        name: 'no2',
        num: 100,
    },
    {
        value: data['co'],
        name: 'co',
        num: 100,
    },
    {
        value: data['o3'],
        name: 'o3',
        num: 100,
    },

];


var titleData =[]
var series =[]

arrayTemp.forEach((item, index) => {
    const color = ColorList[index];
    const centerX = spacing * (index + 1);
    // 计算相对于推荐值的比例
    let valueRelative = item.value / recommendedValues[item.name];

    // 确保比值在0和1之间
    valueRelative = valueRelative > 1 ? 1 : valueRelative;

    titleData.push({
        text: item.name.toUpperCase(),
        x: `${centerX-1}%`,
        y: '30%',
        textAlign: 'center',
        textStyle: {
            fontSize: '14',
            color: color,
            textAlign: 'center',
        },
    });

    series.push({
        type: 'liquidFill',
        name: item.name.toUpperCase(),
        radius: '16%',
        center: [`${centerX}%`, '50%'],
        data: [valueRelative], // 使用计算出来的相对比例
        color: [color],
        itemStyle: {
            opacity: 0.6,
        },
        outline: {
            borderDistance: 5,
            itemStyle: {
                borderWidth: 1,
                borderColor: color,
                shadowBlur: 10,
                shadowColor: '#000',
            },
        },
        label: {
            // 如果你想显示当前的值，使用这个formatter
            position: ['50%', '50%'],
            formatter: function () {
                return `${Math.round(valueRelative * 100)}%`;  // 显示成百分比
            },
            fontSize: 18,
            color: '#fff',
        },
    });
});

option = {
    title: titleData,
    series: series,
    backgroundColor: 'transparent',
    tooltip: {
        show:false,
    },
};

myChart.setOption(option);})}

sq('武汉','2015-01-01')

document.getElementById('tj').addEventListener('click',function (){
  let selectedDate = document.getElementById('date').value;
  let city=document.getElementById('city').value;
  if (!selectedDate) {
        selectedDate = '2015-01-01'; // 设置默认日期值
    }
  sq(city,selectedDate)
})

document.getElementById('ss').addEventListener('click',function (){
  let city = document.getElementById('city').value;
    if (!city) {
          city = '武汉'; // 设置默认日期值
      }
  let date = document.getElementById('date').value;
  sq(city,date)
})

eventBus.on('provinceChanged', (province) => {
  const city = province; // 确保‘province’是合适的数据格式
  const date = document.getElementById('date').value;
  sq(city, date);
});