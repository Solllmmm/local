
const chartDomyu = document.getElementById('echart7');
myChartyu=echarts.init(chartDomyu,null,{
    width: '430.36px',
    height: '310px'
});
$(function (){

yubao()

function yubao(){
    fetch(`https://devapi.qweather.com/v7/air/5d?location=101010100&key=${window.key}`)
        .then(response=>response.json())
        .then(ybdata=>{
            let rq = []
            datayb=ybdata['daily']

            riqi=datayb.map(item=>{
                return item['fxDate']
            })
            aqi=datayb.map(item=>{
                return item['aqi']
            })
            category=datayb.map(item=>{
                return item['category']
            })
            riqi.forEach(item=>{
                const date=new Date(item)
					const month=(date.getMonth() + 1).toString().padStart(2, '0');
					const day = (date.getDate() + 1 ).toString().padStart(2, '0');
					rq.push(`${month}-${day}`) ;
            })
            tt(rq,aqi,category)
        })
}

window.up=function (){
        if (window.ceng===2){
            var Lcode=window.zb.find(item=>item.city_name===window.cityname).Lcode
            fetch(`https://devapi.qweather.com/v7/air/5d?location=${Lcode}&key=${window.key}`)
                .then(response=>response.json())
                .then(ybdata=>{
                    let rq = []
                    datayb=ybdata['daily']
                riqi=datayb.map(item=>{
                    return item['fxDate']
                })
                aqi=datayb.map(item=>{
                    return item['aqi']
                })
                category=datayb.map(item=>{
                    return item['category']
                })
                    riqi.forEach(item=>{
                const date=new Date(item)
					const month=(date.getMonth() + 1).toString().padStart(2, '0');
					const day = (date.getDate() + 1).toString().padStart(2, '0');
					rq.push(`${month}-${day}`) ;
            })
            tt(rq,aqi,category)
                })
        }
}
    function tt(rq,aqi,category){

option = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [{
        type: 'category',
        data: rq,
        axisLine: {
            lineStyle: {
                color: "#f5f2f2"
            }
        },
        axisLabel: {
    interval: 0 // 设置为 0 强制显示所有标签
  }
    }],
    yAxis: [{
        type: 'value',
        splitNumber: 6,
        splitLine: {
            show: false, // 关闭X轴网格线
            lineStyle: {
                type: 'dashed',
                color: '#DDD'
            }
        },
        axisLine: {
            show: false,
            lineStyle: {
                						 fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial' // 字体家族
            },
        },
        nameTextStyle: {
            color: "#999"
        },
        splitArea: {
            show: false
        }
    }],
    series: [{
        name: 'aqi',
        type: 'line',
        data: aqi,
        lineStyle: {
            normal: {
                width: 8,
                color: {
                    type: 'linear',

                    colorStops: [{
                        offset: 0,
                        color: '#A9F387' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#48D8BF' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 10,
                shadowOffsetY: 20
            }
        },
        itemStyle: {
            normal: {
                color: '#fff',
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100,*/
                borderColor: "#A9F387"
            }
        },
        smooth: true,
        areaStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(72,216,191, 1)' // 渐变颜色的起始处
      }, {
        offset: 1,
        color: 'rgba(72,216,191, 0)' // 渐变颜色的结束处，完全透明
      }]),
    }
  }
    }]
};
myChartyu.setOption(option)
myChartyu.resize();
}
window.addEventListener('resize', function() {
    myChartyu.resize();
});

    })