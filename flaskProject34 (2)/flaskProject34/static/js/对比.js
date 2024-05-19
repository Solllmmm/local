var myChart1 = echarts.init(document.getElementById('chart1'));
        var myChart2 = echarts.init(document.getElementById('chart2'));
        // 点击按钮触发查询
        document.getElementById('submitBtn1').onclick = function() {
            var city = document.getElementById('city1').value;
            // 使用fetch来发送POST请求
            fetch('/dbcx_page', {
                method: 'POST',
                body: JSON.stringify({ city1: city }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.json(); // 从响应中获取JSON数据
            }).then(function(data){
                window.chatdata1=data.city1_data;
                // 这里你可以获取到后端传来的数据，并根据这些数据设置ECharts图表的option
                option1 = {
                    tooltip: {
                        trigger: 'item',
                    },
                    angleAxis: {
                        show: false,
                        max: 400,
                        type: 'value',
                        startAngle: 225,
                        splitLine: {
                            show: false,
                        },
                    },
                    //圆环宽度
                    barMaxWidth: 30,
                    radiusAxis: {
                        show: false,
                        type: 'category',
                        z: 10,
                    },
                    polar: {
                        //圆环大小
                        radius: '160%',
                    },
                    series: [
                        {
                            name: 'AQI',
                            type: 'bar',
                            data: [
                                {
                                    value: data.city1_data.aqi,
                                    itemStyle: {
                                        color: 'rgba(35, 176, 176, 1)',
                                        shadowColor: 'rgba(35, 176, 176, 0.5)',
                                        shadowBlur: 10,
                                    },
                                },
                            ],
                            barGap: '-100%',
                            coordinateSystem: 'polar',
                            roundCap: true,
                            z: 2,
                            animationDuration: 2000,
                        },
                        {
                            //底层圆环
                            type: 'bar',
                            data: [
                                {
                                    value: 300,
                                    itemStyle: {
                                        color: '#EBEDF5',
                                    },
                                },
                            ],
                            barGap: '-100%',
                            coordinateSystem: 'polar',
                            roundCap: true,
                            z: 1,
                            animation: false,
                        },
                        {
                            name: 'AQI',
                            type: 'gauge',
                            //startAngle: 180,
                            //endAngle: 0,
                            min: 0,
                            max: 300,
                            splitNumber: 10,
                            radius: '70%', //图表尺寸
                            center: ['50%', '50%'],
                            detail: {
                                formatter: data.city1_data.category,
                                color: 'auto',
                                rich: {
                                    r1: {
                                        fontSize: 30,
                                        verticalAlign: 'bottom',
                                        padding: [0, 5, -2, 0],
                                    },
                                    r2: {
                                        fontSize: 20,
                                        verticalAlign: 'bottom',
                                    },
                                },
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 2,
                                    borderColor: '#2262E4',
                                },
                            },
                            pointer: {
                                icon:
                                    'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                                length: '75%',
                                width: 10,
                                offsetCenter: [0, '5%'],
                            },
                            progress: {
                                roundCap: true,
                                show: true,
                                width: 18,
                            },
                            itemStyle: {
                                color: '#2262E4',
                            },
                            data: [
                                {
                                    value: data.city1_data.aqi,
                                    name: '',
                                },
                            ],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 0,
                                    shadowBlur: 0,
                                    color: [
                                        [0.2, '#23AFAF'],
                                        [0.4, '#2270DA'],
                                        [0.6, '#E99D02'],
                                        [1, '#F45656'],
                                    ],
                                },
                            },
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2,
                                },
                                length: 10,
                                splitNumber: 5,
                            },
                            splitLine: {
                                show: true,
                                length: 12,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2,
                                },
                            },
                            axisLabel: {
                                distance: 5,
                                color: '#9BA5BC',
                                fontSize: 12,
                            },
                        },
                        {
                            type: 'pie',
                            labelLine: {
                                show: false,
                            },
                            z: 1,
                            radius: 20,
                            data: [
                                {
                                    value: 5,
                                    itemStyle: {
                                        color: '#EAEBF1',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'pie',
                            labelLine: {
                                show: false,
                            },
                            z: 10,
                            radius: 5,
                            data: [
                                {
                                    value: 300,
                                    itemStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                        },
                    ],
                };

                myChart1.setOption(option1);
                option2 = {
                    color: ['#3D91F7', '#61BE67'],
                    tooltip: {},
                    legend: {
                        show: true,
                        icon: "circle",
                        bottom: 30,
                        center: 0,
                        itemWidth: 14,
                        itemHeight: 14,
                        itemGap: 21,
                        orient: "horizontal",
                        data: ['a', 'b'],
                        textStyle: {
                            fontSize: '70%',
                            color: '#8C8C8C'
                        },
                    },

                    radar: {
                        // shape: 'circle',
                        radius: '80%',
                        triggerEvent: true,
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '20',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        nameGap: '2',
                        indicator: [
                            { name: 'PM2.5', max: 250 },
                            { name: 'PM10', max: 400 },
                            { name: 'SO2', max: 100 },
                            { name: 'O3', max: 200 },
                            { name: 'CO', max: 3 },
                            { name: 'NO2', max: 150 },
                        ],
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(0, 255, 255, 0.1)', 'rgba(0, 255, 255, 0.2)',
                                    'rgba(0, 255, 255, 0.3)', 'rgba(0, 255, 255, 0.4)',
                                    'rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.6)'
                                ].reverse()
                            }
                        },
                        // axisLabel:{//展示刻度
                        //     show: true
                        // },
                        axisLine: { //指向外圈文本的分隔线样式
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width: 2,
                                color: 'transparent'
                            }
                        },

                    },

                    series: [{
                        name: '六个污染指标',
                        type: 'radar',
                        itemStyle: {
                            borderColor: 'rgba(66, 242, 185, 1)',
                            color: '#fff',
                            borderWidth: 0.2
                        },
                        areaStyle: {
                            normal: {
                                color: 'rgba(0, 255, 255, 1)'
                            }
                        },
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: 'rgba(252,211,3, 1)',
                                width: 1
                            }
                        },
                        data: [{
                            value: [data.city1_data['pm2.5'], data.city1_data.pm10, data.city1_data.so2, data.city1_data.o3, data.city1_data.co, data.city1_data.no2],
                        }
                        ]
                    }]
                }
                myChart2.setOption(option2);
            }).catch(function(error){
                console.log('Request failed', error);
            });
        };
        var myChart3 = echarts.init(document.getElementById('chart3'));
        var myChart4 = echarts.init(document.getElementById('chart4'));
        // 点击按钮触发查询
        document.getElementById('submitBtn2').onclick = function() {
            var city = document.getElementById('city2').value;
            // 使用fetch来发送POST请求
            fetch('/dbcx_page', {
                method: 'POST',
                body: JSON.stringify({ city2: city }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.json(); // 从响应中获取JSON数据
            }).then(function(data){
                window.chatdata2=data.city2_data;
                // 这里你可以获取到后端传来的数据，并根据这些数据设置ECharts图表的option
                option3 = {
                    tooltip: {
                        trigger: 'item',
                    },
                    angleAxis: {
                        show: false,
                        max: 400,
                        type: 'value',
                        startAngle: 225,
                        splitLine: {
                            show: false,
                        },
                    },
                    //圆环宽度
                    barMaxWidth: 30,
                    radiusAxis: {
                        show: false,
                        type: 'category',
                        z: 10,
                    },
                    polar: {
                        //圆环大小
                        radius: '160%',
                    },
                    series: [
                        {
                            name: 'AQI',
                            type: 'bar',
                            data: [
                                {
                                    value: data.city2_data.aqi,
                                    itemStyle: {
                                        color: 'rgba(35, 176, 176, 1)',
                                        shadowColor: 'rgba(35, 176, 176, 0.5)',
                                        shadowBlur: 10,
                                    },
                                },
                            ],
                            barGap: '-100%',
                            coordinateSystem: 'polar',
                            roundCap: true,
                            z: 2,
                            animationDuration: 2000,
                        },
                        {
                            //底层圆环
                            type: 'bar',
                            data: [
                                {
                                    value: 300,
                                    itemStyle: {
                                        color: '#EBEDF5',
                                    },
                                },
                            ],
                            barGap: '-100%',
                            coordinateSystem: 'polar',
                            roundCap: true,
                            z: 1,
                            animation: false,
                        },
                        {
                            name: 'AQI',
                            type: 'gauge',
                            //startAngle: 180,
                            //endAngle: 0,
                            min: 0,
                            max: 300,
                            splitNumber: 10,
                            radius: '70%', //图表尺寸
                            center: ['50%', '50%'],
                            detail: {
                                formatter: data.city2_data.category,
                                color: 'auto',
                                rich: {
                                    r1: {
                                        fontSize: 30,
                                        verticalAlign: 'bottom',
                                        padding: [0, 5, -2, 0],
                                    },
                                    r2: {
                                        fontSize: 20,
                                        verticalAlign: 'bottom',
                                    },
                                },
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 10,
                                itemStyle: {
                                    borderWidth: 2,
                                    borderColor: '#2262E4',
                                },
                            },
                            pointer: {
                                icon:
                                    'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                                length: '75%',
                                width: 10,
                                offsetCenter: [0, '5%'],
                            },
                            progress: {
                                roundCap: true,
                                show: true,
                                width: 18,
                            },
                            itemStyle: {
                                color: '#2262E4',
                            },
                            data: [
                                {
                                    value: data.city2_data.aqi,
                                    name: '',
                                },
                            ],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 0,
                                    shadowBlur: 0,
                                    color: [
                                        [0.2, '#23AFAF'],
                                        [0.4, '#2270DA'],
                                        [0.6, '#E99D02'],
                                        [1, '#F45656'],
                                    ],
                                },
                            },
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2,
                                },
                                length: 10,
                                splitNumber: 5,
                            },
                            splitLine: {
                                show: true,
                                length: 12,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2,
                                },
                            },
                            axisLabel: {
                                distance: 5,
                                color: '#9BA5BC',
                                fontSize: 12,
                            },
                        },
                        {
                            type: 'pie',
                            labelLine: {
                                show: false,
                            },
                            z: 1,
                            radius: 20,
                            data: [
                                {
                                    value: 5,
                                    itemStyle: {
                                        color: '#EAEBF1',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'pie',
                            labelLine: {
                                show: false,
                            },
                            z: 10,
                            radius: 5,
                            data: [
                                {
                                    value: 300,
                                    itemStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                        },
                    ],
                };

                myChart3.setOption(option3);
                option4 = {
                    color: ['#3D91F7', '#61BE67'],
                    tooltip: {},
                    legend: {
                        show: true,
                        icon: "circle",
                        bottom: 30,
                        center: 0,
                        itemWidth: 14,
                        itemHeight: 14,
                        itemGap: 21,
                        orient: "horizontal",
                        data: ['a', 'b'],
                        textStyle: {
                            fontSize: '70%',
                            color: '#8C8C8C'
                        },
                    },

                    radar: {
                        // shape: 'circle',
                        radius: '80%',
                        triggerEvent: true,
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '20',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        nameGap: '2',
                        indicator: [
                            { name: 'PM2.5', max: 250 },
                            { name: 'PM10', max: 400 },
                            { name: 'SO2', max: 100 },
                            { name: 'O3', max: 200 },
                            { name: 'CO', max: 3 },
                            { name: 'NO2', max: 150 },
                        ],
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(0, 255, 255, 0.1)', 'rgba(0, 255, 255, 0.2)',
                                    'rgba(0, 255, 255, 0.3)', 'rgba(0, 255, 255, 0.4)',
                                    'rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.6)'
                                ].reverse()
                            }
                        },
                        // axisLabel:{//展示刻度
                        //     show: true
                        // },
                        axisLine: { //指向外圈文本的分隔线样式
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width: 2,
                                color: 'transparent'
                            }
                        },

                    },

                    series: [{
                        name: '六个污染指标',
                        type: 'radar',
                        itemStyle: {
                            borderColor: 'rgba(66, 242, 185, 1)',
                            color: '#fff',
                            borderWidth: 0.2
                        },
                        areaStyle: {
                            normal: {
                                color: 'rgba(0, 255, 255, 1)'
                            }
                        },
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: 'rgba(252,211,3, 1)',
                                width: 1
                            }
                        },
                        data: [{
                            value: [data.city2_data['pm2.5'], data.city2_data.pm10, data.city2_data.so2, data.city2_data.o3, data.city2_data.co, data.city2_data.no2],
                        }
                        ]
                    }]
                }
                myChart4.setOption(option4);
            }).catch(function(error){
                console.log('Request failed', error);
            });
        };