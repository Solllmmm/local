const get_time_type=(time_type,start_time,privent)=>{
fetch(`/year_month?time_type=${time_type}&start_time=${start_time}&privent=${privent}`)
    .then(response=>response.json())
    .then(data3=>{
var chartDom = document.getElementById('line-pie');
var myChart = echarts.init(chartDom);
var option;

setTimeout(function () {
  option = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: data3
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: {
		width: 1200,
		height:400,
		top: '45%',
		left: '20%',
		right: '15%'
	},
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
        {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
        {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
        {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '20%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
  };
  myChart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  myChart.setOption(option);
});
}).catch(error => console.error('Error:', error))
}

let privent=document.getElementById('city').value
get_time_type('week','2021-01-01',privent)

document.getElementById('sx').addEventListener('click',function (){
  event.preventDefault();
  let time_type=document.getElementById('period').value;
  let start_time=document.getElementById('start_time').value;
  let privent=document.getElementById('city').value
  get_time_type(time_type,start_time,privent)
})
//响应在搜索城市时也进行展示饼图数据
document.getElementById('ss').addEventListener('click',function (){
  event.preventDefault();
  let time_type=document.getElementById('period').value;
  let start_time=document.getElementById('start_time').value;
  let privent=document.getElementById('city').value
  get_time_type(time_type,start_time,privent)
})