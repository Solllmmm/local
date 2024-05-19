
let imgSrc = '../static/icon/空气质量.png';
const panchartDom = document.getElementById('echart5');
myChartpan=echarts.init(panchartDom)
$(function (){
    yibiaopan()
    function yibiaopan(){
fetch(`https://devapi.qweather.com/v7/air/now?location=101010100&key=${window.key}`)
    .then(response=>response.json())
    .then(data=>{
        let dataarr=data.now.aqi
        let primary=data.now.primary
        let ybpcategory=data.now.category
        pp(dataarr,primary,ybpcategory)
    })}

window.yibiaopan=function (){
        if(window.ceng===2){
            var Lcode=window.zb.find(item=>item.city_name===window.cityname).Lcode
            fetch(`https://devapi.qweather.com/v7/air/now?location=${Lcode}&key=${window.key}`)
                .then(response=>response.json())
                .then(ybpdata=>{
                    dataarr=ybpdata.now.aqi
                    let primary=ybpdata.now.primary
                    let ybpcategory=ybpdata.now.category
                    pp(dataarr,primary,ybpcategory)
                })
        }
}


    function pp(dataarr,primary,ybpcategory){
option = {
    backgroundColor: 'rgba(14,19,39,0)',
    tooltip: {
        formatter: function (params) {
                return'AQI: ' + dataarr + '<br/>' +
                       '主要污染物: ' + primary;
            },
    },
    graphic: {
        elements: [{
            type: "image",
            z: 3,
            style: {
                image: imgSrc,
                width: 70,
                height: 70,
            },
            top: 'middle',
            left: 'center',
            scale: [0.5, 0.5]

        }]
    },
    series: [
        {
            name: 'aqi',
            type: 'gauge',
            max:200,
            center: ['50%', '50%'],
            radius: '90%',
            z: 1,
            startAngle: 270,
            endAngle: 0,
            splitNumber: 5,
            progress: {
                show: true,
                width: 27,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#93d5dc',
                            },
                            {
                                offset: 0.5,
                                color: '#29b7cb',
                            },
                            {
                                offset: 1,
                                color: '#126e82',
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: [[1, 'rgba(240,240,240,0.2)']],

                //     width: 27,
                // },
            },
            axisLabel: {
                show: true,
                color: 'rgba(240,240,240,0.5)',
                fontSize: 12,
                distance: 15,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            itemStyle: {
                show: false,
            },
            detail: {
                offsetCenter: ['92%', '30%'],
                textStyle: {
                    padding: [0, 0, 0, 0],
                    fontSize: 24,

                    color: 'rgba(240,240,240,1)',
                },
            },
            title: {
                show: true,
                offsetCenter: ['92%', '50%'],
                textStyle: {
                    color: 'rgba(240,240,240,1)',
                    fontSize: 12,

                    fontFamily: 'PingFangSC',
                },
            },
            data: [
                {
                    name: ybpcategory,
                    value: dataarr,
                },
            ],
            pointer: {
                show: false

            },
            // animation: false
        },
        {
            name: '刻度',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '90%',
            z: 999,
            startAngle: 270,
            endAngle: -0,
            splitNumber: 80,
            progress: {
                show: false,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    width: 27,
                },
            },
            //仪表盘轴线
            axisLabel: {
                show: false,
            }, //刻度标签。
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                length: 27,
                lineStyle: {
                    color: '#c0c4c3',
                    width: 3,
                },
                distance: -27
            },
            itemStyle: {
                show: false,
            },
            detail: {
                show: false,
            },
            title: {
                //标题
                show: false,
            },

            pointer: {
                show: false,
            },

        },
        {
            name: '最外边线',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '25%',
            z: 999,
            startAngle: 270,
            endAngle: 0,
            splitNumber: 50,
            progress: {
                show: false,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    width: 1,
                    color: [[1, 'rgba(240,240,240,0.2)']],
                },
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                length: 1,
                lineStyle: {
                    color: 'rgba(240,240,240,0.2)',
                    width: 5,
                },
            },
            itemStyle: {
                show: false,
            },
            detail: {
                show: false,
            },
            title: {
                show: false,
            },

            pointer: {
                show: false,
            },
        },
        {
            name: '最外刻度亮线',
            type: 'gauge',
            radius: '90%',
            center: ['50%', '50%'],
            startAngle: 270 - (270 * dataarr) / 200 + 1,
            endAngle: 270 - (270 * dataarr) / 200 - 30,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: [
                        [3 / 200, 'rgba(16,235,227,1)'],
                    ],
                    width: 29,
                    shadowColor: 'rgba(16,235,227,1)',
                    shadowBlur: 10,
                },
            },
            progress: {
                show: false,
                width: 29,
                itemStyle: {
                    color: '#10EBE3',
                    shadowColor: 'rgba(16,235,227,1)',
                    shadowBlur: 10,
                },
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            detail: {
                show: false,
            },
            pointer: {
                show: false,
            },
            animationDelay: 850,
            animationDuration: 300,
            data: [
                {
                    name: 'title',
                    value: 100,
                },
            ],
            title: {
                show: false,
            },
        },
        {
            name: "",
            type: "pie",
            radius: [0, '20%'],
            center: ["50%", "50%"],
            tooltip: {
               show: false
            },
            label: {
                show: false
            },
            itemStyle: {
                normal: {
                    color: 'rgba(24,219,159,0.1)'
                },
            },
            hoverAnimation: false,
            animation: false,
            data: [100]
        }
    ],
}
myChartpan.setOption(option)
    }
})

