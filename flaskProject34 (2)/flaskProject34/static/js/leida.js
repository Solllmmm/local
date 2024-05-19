
const fetch_city_date=(city,date)=>{
fetch(`/leida?city=${city}&date=${date}`)
    .then(response=>response.json())
    .then(data=>{


      fetch(`avg_leida?city=${city}`)
          .then(response=>response.json())
          .then(data_avg=>{
var chartDom = document.getElementById('leida');
var myChart = echarts.init(chartDom);
var option;
option = {
  title: {
    text: ''
  },
  legend: {
    data: ['平均空气指标', '城市空气指标']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'PM2.5', max: 200 },
      { name: 'PM10', max: 250 },
      { name: 'SO2', max: 50 },
      { name: 'NO2', max: 100 },
      { name: 'CO', max: 5 },
      { name: 'O3', max: 100 }
    ]
  },
  series: [
    {
      name: '城市空气质量对比 vs 城市空气指标',
      type: 'radar',

      data: [
        {
          value: [data_avg['pm2_5'], data_avg['pm10'], data_avg['so2'], data_avg['no2'], data_avg['co'], data_avg['o3']],
          name: '平均空气指标'
        },
        {
          value: [data['pm2_5'], data['pm10'], data['so2'], data['no2'], data['co'], data['o3']],
          name: '城市空气指标'
        }
      ]
    }
  ]
};
myChart.setOption(option);
})
})}


fetch_city_date('武汉','2015-01-01')
document.getElementById('tj').addEventListener('click',function (){
  let selectedDate = document.getElementById('date').value;
  let city=document.getElementById('city').value;
  if (!selectedDate) {
        selectedDate = '2015-01-01'; // 设置默认日期值
    }
  fetch_city_date(city,selectedDate)
})

document.getElementById('ss').addEventListener('click',function (){
  let city = document.getElementById('city').value;
    if (!city) {
          city = '武汉'; // 设置默认日期值
      }
  let date = document.getElementById('date').value;
  fetch_city_date(city,date)
})


eventBus.on('provinceChanged', (province) => {
  const city = province;
  const date = document.getElementById('date').value;
  fetch_city_date(city, date);
});
