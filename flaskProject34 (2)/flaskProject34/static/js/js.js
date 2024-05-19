$(function() {
	echarts_1();
    echarts_2();
	echarts_3();
    echarts_4();
	// 注意哈5和6针对的都是同一个城市
    echarts_5();
    echarts_6();
	echarts_7();
    zb1();
    zb2();
    zb3();
    zb4();
    zb5();
    zb6();
	function echarts_1() {
        const fetch_privent=(privent)=>{
            fetch(`/jiesao?privent=${privent}`)
                .then(response=>response.json())
                .then(data1=> {
        var myChart = echarts.init(document.getElementById('echart12'));
        // 这里放每个省份对应城市的数据
        data = data1

        for (var n in data) {
            data[n]['name'] = data[n]['name'] + ' ：' + data[n]['value']
        }

        option = {
            visualMap: {
                show: false,
                min: 40,
                max: 200,
                itemWidth: 20,
                itemHeight: 130,
                itemGap: 5,
                right: '15%',
                top: 10,
                align: 'left',
                orient: 'horizontal',
                text: ['50', '0'],
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                    align: 'right'
                },
                inRange: {
                    color: ["#37A2DA", "#67E0E3","#FFDB5C","#FF9F7F","#9370DB","#87CEFA"]
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}"
            },
            series: [{
                type: 'treemap',
                width: '100%',
                height: '100%',
                roam: false, //是否开启拖拽漫游（移动和缩放）
                nodeClick: false, //点击节点后的行为,false无反应
                breadcrumb: {
                    show: false
                },
                label: { //描述了每个矩形中，文本标签的样式。
                    normal: {
                        show: true,
                        position: ['10%', '40%']
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        },
                        borderWidth: 1,
                        borderColor: '#fff',
                    },

                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data: data
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
                })}
        fetch_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
  }
			function echarts_2() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('echart22'));
				const fetch_echarts_2_privent = (privent) => {
					fetch(`/echarts2?privent=${privent}`)
						.then(response => response.json())
						.then(data => {
								option = {
									tooltip: {
										trigger: 'item',
										formatter: "{b} : {c} ({d}%)"
									},
									legend: {
										right: 0,
										top: 30,
										height: 160,
										itemWidth: 10,
										itemHeight: 10,
										itemGap: 10,
										textStyle: {
											color: 'rgba(255,255,255,.6)',
											fontSize: 12
										},
										orient: 'vertical',

										data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']
									},
									calculable: true,
									series: [{
										name: ' ',
										color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf'],
										type: 'pie',
										radius: [30, 70],
										center: ['35%', '50%'],
										roseType: 'radius',
										label: {
											normal: {
												show: true,
												fontSize: 14, // 字体大小
            fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial' // 字体家族
											},
											emphasis: {
												show: true
											}
										},
										labelLine: {
											normal: {
												show: true
											},
											emphasis: {
												show: true
											}
										},
										// 修改data数据为对应的指标数值
										data: [{
											value: data[0]['pm2_5'], // 要改的后续同步
											name: 'pm2.5'
										},
											{
												value: data[0]['pm_10'],
												name: 'PM10'
											},
											{
												value: data[0]['so2'],
												name: 'SO2'
											},
											{
												value: data[0]['no2'],
												name: 'NO2'
											},
											{
												value: data[0]['co'],
												name: 'CO'
											},
											{
												value: data[0]['03'],
												name: 'O3'
											}
										]
									}]
								};

								// 使用刚指定的配置项和数据显示图表。
								myChart.setOption(option);
								window.addEventListener("resize", function () {
									myChart.resize();
								});
							}
						)
				}
				fetch_echarts_2_privent('北京')
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName去做一些工作
  fetch_echarts_2_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}
			function echarts_3() {
		const fetch_echarts_3_privent = (privent) => {
					fetch(`/echarts3?privent=${privent}`)
						.then(response => response.json())
						.then(data => {
							var chartDom = document.getElementById('echart32');
							var myChart = echarts.init(chartDom);
							var option;
							// 数据格式：[{"date": "2013-06-01", "average_aqi": 115.11764705882354},......都是字典]
							// 这里放2023年每一天的这个省份的平均aqi
								var dates = data.map(item => item.date);
								var aqis = data.map(item => item.average_aqi);
								myChart.setOption(
									(option = {
										tooltip: {
											trigger: 'axis'
										},
										grid: {
											left: '8%',
											right: '2%',
											bottom: '10%'
										},
										xAxis: {
											data: dates,
											axisLabel: {
												textStyle: {
													color: '#ffffff' // white color
												}
											}
										},
										yAxis: {
											axisLabel: {
												textStyle: {
													color: '#ffffff' // white color
												}
											}
										},
										dataZoom: [
											{
												startValue: '2013-01-01'  // 要改的
											},
											{
												type: 'inside'
											}
										],
										visualMap: {
											top: 10,
											left: 'center',
											orient: 'horizontal',
											itemWidth: 10,
											itemHeight: 20,
											itemGap: 5,
											pieces: [
												{
													gt: 0,
													lte: 50,
													color: '#93CE07'
												},
												{
													gt: 50,
													lte: 100,
													color: '#FBDB0F'
												},
												{
													gt: 100,
													lte: 150,
													color: '#FC7D02'
												},
												{
													gt: 150,
													lte: 200,
													color: '#FD0100'
												},
												{
													gt: 200,
													lte: 300,
													color: '#AA069F'
												},
												{
													gt: 300,
													color: '#AC3B2A'
												}
											],
											outOfRange: {
												color: '#999'
											},
											textStyle: {
												color: '#ffffff' // Set text color to white
											}
										},

										series: {
											name: 'AQI',
											type: 'line',
											data: aqis,
											markLine: {
												silent: true,
												lineStyle: {
													color: '#333'
												},
												data: [
													{
														yAxis: 50
													},
													{
														yAxis: 100
													},
													{
														yAxis: 150
													},
													{
														yAxis: 200
													},
													{
														yAxis: 300
													}
												]
											},
											label: {
												color: '#ffffff' // white color
											}
										}
									})
								);

							option && myChart.setOption(option);
							window.addEventListener("resize", function () {
								myChart.resize();
							})
						})}
								fetch_echarts_3_privent('北京')
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName去做一些工作
  fetch_echarts_3_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function echarts_4() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('echart42'));
				const fetch_echarts_4_privent = (privent) => {
					fetch(`/echarts4?privent=${privent}`)
						.then(response => response.json())
						.then(data => {
							option = {
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										lineStyle: {
											color: '#57617B'
										}
									}
								},
								legend: {
									data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
									top: '0',
									textStyle: {
										color: "#fff"
									},
									itemGap: 20,
								},
								grid: {
									left: '0',
									right: '20',
									top: '10',
									bottom: '20',
									containLabel: true
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									axisLabel: {
										show: true,
										textStyle: {
											color: 'rgba(255,255,255,1)',
											fontSize: 11
										}
									},
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
									data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
								}],
								yAxis: [{
									axisLabel: {
										show: true,
										textStyle: {
											color: 'rgba(255,255,255,.6)'
										}
									},
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
									splitLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									}
								}],
								series: [{
									name: 'PM2.5',
									type: 'line',
									smooth: true,
									symbol: 'circle',
									symbolSize: 5,
									showSymbol: false,
									lineStyle: {
										normal: {
											width: 2
										}
									},
									itemStyle: {
										normal: {
											color: '#277ace',
											borderColor: 'rgba(0,136,212,0.2)',
											borderWidth: 12
										}
									},
									areaStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: 'rgba(39, 122, 206, 0.3)'
											}, {
												offset: 0.8,
												color: 'rgba(39, 122, 206, 0)'
											}], false),
											shadowColor: 'rgba(0, 0, 0, 0.1)',
											shadowBlur: 10
										}
									},
									data: [data[0]['pm2_5'], data[1]['pm2_5'], data[2]['pm2_5'], data[3]['pm2_5'], data[4]['pm2_5'], data[5]['pm2_5'], data[6]['pm2_5'], data[7]['pm2_5'], data[8]['pm2_5'], data[9]['pm2_5'], data[10]['pm2_5'], data[11]['pm2_5']] // 要改的
								},
									{
										name: 'PM10',
										type: 'line',
										smooth: true,
										symbol: 'circle',
										symbolSize: 5,
										showSymbol: false,
										lineStyle: {
											normal: {
												width: 2
											}
										},
										itemStyle: {
											normal: {
												color: '#67E0E3',
												borderColor: 'rgba(10,148,236,0.5)',
												borderWidth: 12
											}
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgba(103, 224, 227, 0.3)'
												}, {
													offset: 0.8,
													color: 'rgba(103, 224, 227, 0)'
												}], false),
												shadowColor: 'rgba(0, 0, 0, 0.1)',
												shadowBlur: 10
											}
										},
										data: [data[0]['pm_10'], data[1]['pm_10'], data[2]['pm_10'], data[3]['pm_10'], data[4]['pm_10'], data[5]['pm_10'], data[6]['pm_10'], data[7]['pm_10'], data[8]['pm_10'], data[9]['pm_10'], data[10]['pm_10'], data[11]['pm_10']] // 要改的
									},
									{
										name: 'SO2',
										type: 'line',
										smooth: true,
										symbol: 'circle',
										symbolSize: 5,
										showSymbol: false,
										lineStyle: {
											normal: {
												width: 2
											}
										},
										itemStyle: {
											normal: {
												color: '#FF7F50',
												borderColor: 'rgba(255,127,80,0.5)',
												borderWidth: 12
											}
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgba(255, 127, 80, 0.3)'
												}, {
													offset: 0.8,
													color: 'rgba(255, 127, 80, 0)'
												}], false),
												shadowColor: 'rgba(0, 0, 0, 0.1)',
												shadowBlur: 10
											}
										},
										data: [data[0]['so2'], data[1]['so2'], data[2]['so2'], data[3]['so2'], data[4]['so2'], data[5]['so2'], data[6]['so2'], data[7]['so2'], data[8]['so2'], data[9]['so2'], data[10]['so2'], data[11]['so2']] // 要改的
									},
									{
										name: 'NO2',
										type: 'line',
										smooth: true,
										symbol: 'circle',
										symbolSize: 5,
										showSymbol: false,
										lineStyle: {
											normal: {
												width: 2
											}
										},
										itemStyle: {
											normal: {
												color: '#DA70D6',
												borderColor: 'rgba(218,112,214,0.5)',
												borderWidth: 12
											}
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgba(218, 112, 214, 0.3)'
												}, {
													offset: 0.8,
													color: 'rgba(218, 112, 214, 0)'
												}], false),
												shadowColor: 'rgba(0, 0, 0, 0.1)',
												shadowBlur: 10
											}
										},
										data: [data[0]['no2'], data[1]['no2'], data[2]['no2'], data[3]['no2'], data[4]['no2'], data[5]['no2'], data[6]['no2'], data[7]['no2'], data[8]['no2'], data[9]['no2'], data[10]['no2'], data[11]['no2']] // 要改的
									},
									{
										name: 'CO',
										type: 'line',
										smooth: true,
										symbol: 'circle',
										symbolSize: 5,
										showSymbol: false,
										lineStyle: {
											normal: {
												width: 2
											}
										},
										itemStyle: {
											normal: {
												color: '#20B2AA',
												borderColor: 'rgba(32,178,170,0.5)',
												borderWidth: 12
											}
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgba(32, 178, 170, 0.3)'
												}, {
													offset: 0.8,
													color: 'rgba(32, 178, 170, 0)'
												}], false),
												shadowColor: 'rgba(0, 0, 0, 0.1)',
												shadowBlur: 10
											}
										},
										data: [data[0]['co'], data[1]['co'], data[2]['co'], data[3]['co'], data[4]['co'], data[5]['co'], data[6]['co'], data[7]['co'], data[8]['co'], data[9]['co'], data[10]['co'], data[11]['co']] // 要改的
									},
									{
										name: 'O3',
										type: 'line',
										smooth: true,
										symbol: 'circle',
										symbolSize: 5,
										showSymbol: false,
										lineStyle: {
											normal: {
												width: 2
											}
										},
										itemStyle: {
											normal: {
												color: '#00BFFF',
												borderColor: 'rgba(0,191,255,0.5)',
												borderWidth: 12
											}
										},
										areaStyle: {
											normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgba(0, 191, 255, 0.3)'
												}, {
													offset: 0.8,
													color: 'rgba(0, 191, 255, 0)'
												}], false),
												shadowColor: 'rgba(0, 0, 0, 0.1)',
												shadowBlur: 10
											}
										},
										data: [data[0]['o3'], data[1]['o3'], data[2]['o3'], data[3]['o3'], data[4]['o3'], data[5]['o3'], data[6]['o3'], data[7]['o3'], data[8]['o3'], data[9]['o3'], data[10]['o3'], data[11]['o3']] // 要改的
									}]
							};
							// 使用刚指定的配置项和数据显示图表。
							myChart.setOption(option);
							window.addEventListener("resize", function () {
								myChart.resize();
							});
						})}
								fetch_echarts_4_privent('北京')
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName去做一些工作
  fetch_echarts_4_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function echarts_5() {
                const fetch_echarts5_privent=(privent)=>{
            fetch(`/echarts5?privent=${privent}`)
                .then(response=>response.json())
                .then(data=> {
                    let cityname = []
                    let good = []
                    let bad = []
                    let aqi = []
                    data.forEach(entry => {
                          cityname.push(entry['cityname']);
                          good.push(entry['good_air_days']);
                          bad.push(entry['pollution_days']);
                        aqi.push(entry['aqi']);
});
                    // 基于准备好的dom，初始化echarts实例
                    console.log(good)
                    var myChart = echarts.init(document.getElementById('echart52'));
                    option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        },
                        "legend": {

                            "data": [{
                                "name": "全年空气质量为优天数"
                            },
                                {
                                    "name": "存在污染天数"
                                },
                                {
                                    "name": "aqi"
                                }
                            ],
                            "top": "0%",
                            "textStyle": {
                                "color": "rgba(255,255,255,1)", //图例文字
                                "fontSize": "16"
                            }
                        },

                        "xAxis": [{
                            "type": "category",
                            // top该省份城市名,要改
                            data: cityname,
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)"
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgb(255,255,255)",
                                    fontSize: '16',
                                },
                            },

                        },],
                        "yAxis": [{
                            "type": "value",
                            "name": "天数",
                            "min": 0,
                            "interval": 10,
                            "axisLabel": {
                                "show": true,

                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,1)'
                                }
                            }, //左线色
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(255,255,255,0.5)"
                                }
                            }, //x轴线
                        },
                            {
                                "type": "value",
                                "name": "aqi",
                                "show": true,
                                "axisLabel": {
                                    "show": true,

                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(255,255,255,1 )'
                                    }
                                }, //右线色
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.2)"
                                    }
                                }, //x轴线
                            },
                        ],
                        "grid": {
                            "top": "10%",
                            "right": "30",
                            "bottom": "30",
                            "left": "30",
                        },
                        "series": [{
                            "name": "全年空气质量为优天数",

                            "type": "bar",
                            // 修改为全年空气质量为优天数的数据
                            "data": good,
                            "barWidth": "auto",
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "#67E0E3"
                                        },

                                            {
                                                "offset": 1,
                                                "color": "#67E0E3"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }
                        },
                            {
                                "name": "存在污染天数",
                                "type": "bar",
                                // 修改为存在污染天数的数据 除去优级和良好的天数
                                "data": bad,
                                "barWidth": "auto",

                                "itemStyle": {
                                    "normal": {
                                        "color": {
                                            "type": "linear",
                                            "x": 0,
                                            "y": 0,
                                            "x2": 0,
                                            "y2": 1,
                                            "colorStops": [{
                                                "offset": 0,
                                                "color": "#FFDB5C"
                                            },
                                                {
                                                    "offset": 1,
                                                    "color": "#FFDB5C"
                                                }
                                            ],
                                            "globalCoord": false
                                        }
                                    }
                                },
                                "barGap": "0"
                            },
                            {
                                "name": "全年平均aqi",
                                "type": "line",
                                "yAxisIndex": 1,

                                // 修改为每个城市全年平均aqi的数据
                                "data": aqi,
                                lineStyle: {
                                    normal: {
                                        width: 2
                                    },
                                },
                                "itemStyle": {
                                    "normal": {
                                        "color": "#48f593",

                                    }
                                },
                                "smooth": true
                            }
                        ]
                    };
                    myChart.setOption(option);
                    window.addEventListener("resize", function () {
                        myChart.resize();
                    });
                })}
                fetch_echarts5_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_echarts5_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
            }

			function echarts_6() {
				// 基于准备好的dom，初始化echarts实例
				const fetch_echarts6_privent=(privent)=>{
			fetch(`/echarts6?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					let cityname = []
					let pm2_5 = []
					let pm10 = []
					let so2 = []
					let no2 = []
					let co = []
					let o3 = []
					data.forEach(entry => {
						cityname.push(entry['cityname']);
						pm2_5.push(entry['pm2_5']);
						pm10.push(entry['pm_10']);
						so2.push(entry['so2']);
						no2.push(entry['no2']);
						co.push(entry['co']);
						o3.push(entry['o3']);
					});
					var myChart = echarts.init(document.getElementById('echart62'));
					var option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						legend: {
							data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
							textStyle: {
								color: 'skyblue'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,1)'
								}
							}
						},
						yAxis: {
							type: 'category',
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,1)'
								}
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: "rgba(255,255,255,.1)"
								}
							},
							// 更改为全年空气质量为优天数 top10 的城市
							data: cityname,
						},
						series: [{
							name: 'PM2.5',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								color: '#37A2DA'
							},
							label: {
								show: false,
								position: 'insideRight'
							},
							// 替换为对应城市的数据
							data: pm2_5
						},
							{
								name: 'PM10',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									color: '#67E0E3'
								},
								label: {
									show: false,
									position: 'insideRight'
								},
								// 替换为对应城市的数据
								data: pm10
							},
							{
								name: 'SO2',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									color: '#FFDB5C'
								},
								label: {
									show: false,
									position: 'insideRight'
								},
								// 替换为对应城市的数据
								data: so2
							},
							{
								name: 'NO2',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									color: '#FF9F7F'
								},
								label: {
									show: false,
									position: 'insideRight'
								},
								// 替换为对应城市的数据
								data: no2
							},
							// 添加 CO 和 O3 数据
							{
								name: 'CO',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									color: '#9370DB'
								},
								label: {
									show: false,
									position: 'insideRight'
								},
								// 替换为对应城市的数据
								data: co
							},
							{
								name: 'O3',
								type: 'bar',
								stack: '总量',
								itemStyle: {
									color: '#87CEFA'
								},
								label: {
									show: false,
									position: 'insideRight'
								},
								// 替换为对应城市的数据
								data: o3
							}
						]
					};

					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_echarts6_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_echarts6_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function echarts_7() {
		const fetch_echarts_7_privent=(privent)=>{
			fetch(`/echarts7?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('echart72'));

					option = {
						tooltip: {
							trigger: 'item',
							formatter: "{b} : {c} ({d}%)"
						},
						legend: {

							top: '15%',
							data: [data[0]['air_lv'], data[1]['air_lv'], data[2]['air_lv'], data[3]['air_lv'], data[4]['air_lv']],
							icon: 'circle',
							textStyle: {
								color: 'rgba(255,255,255,.6)',
							}
						},
						calculable: true,
						series: [{
							name: '',
							color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf', '#c9c862', '#c98b62', '#c962b9', '#c96262'],
							type: 'pie',
							//起始角度，支持范围[0, 360]
							startAngle: 0,
							//饼图的半径，数组的第一项是内半径，第二项是外半径
							radius: [51, 100],
							//支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
							center: ['50%', '45%'],

							//是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
							// 'radius' 面积展现数据的百分比，半径展现数据的大小。
							//  'area' 所有扇区面积相同，仅通过半径展现数据大小
							roseType: 'area',
							//是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: true,
									 fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial' // 字体家族
									//  formatter: '{c}辆'
								},
								emphasis: {
									show: true
								}
							},
							labelLine: {
								normal: {
									show: true,
									length2: 1,
								},
								emphasis: {
									show: true
								}
							},
							data: [{
								value: data[0]['total'], // 要改的,这里是次数统计
								name: data[0]['air_lv'],
							},
								{
									value: data[1]['total'],	// 要改的
									name: data[1]['air_lv'],
								},
								{
									value: data[2]['total'],	// 要改的
									name: data[2]['air_lv'],
								},
								{
									value: data[3]['total'],	// 要改的
									name: data[3]['air_lv'],
								},
								{
									value: data[4]['total'],	// 要改的
									name: data[4]['air_lv'],
								},

								{
									value: 0,
									name: "",
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								{
									value: 0,
									name: "",
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								{
									value: 0,
									name: "",
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								{
									value: 0,
									name: "",
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								{
									value: 0,
									name: "",
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},


							]
						}]
					};

					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				    	fetch_echarts_7_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_echarts_7_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb1() {
		const fetch_zb1_privent=(privent)=>{
			fetch(`/zb1?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {

					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(document.getElementById('zb12'));
					var v2 = data[0]['pm2_5'] //要改的
					var v3 = 250 //总指标
					var v1 = v3 - v2
					option = {
						tooltip: {
							trigger: 'item',
						},
						series: [{

							type: 'pie',
							radius: ['60%', '70%'],
							color: '#37A2DA',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'PM2.5',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_zb1_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb1_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb2() {
		const fetch_zb2_privent=(privent)=>{
			fetch(`/zb2?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('zb22'));
					var v2 = data[0]['pm10'] //要改的
					var v3 = 420 //总指标
					var v1 = v3 - v2
					option = {

						tooltip: {
							trigger: 'item',
						},
						series: [{
							type: 'pie',
							radius: ['60%', '70%'],
							color: '#32C5E9',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'PM10',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_zb2_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb2_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb3() {
				// 基于准备好的dom，初始化echarts实例
				const fetch_zb3_privent=(privent)=>{
			fetch(`/zb3?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					var myChart = echarts.init(document.getElementById('zb32'));
					var v2 = data[0]['so2'] //要改的
					var v3 = 120 //总指标
					var v1 = v3 - v2
					option = {
						tooltip: {
							trigger: 'item',
						},
						series: [{

							type: 'pie',
							radius: ['60%', '70%'],
							color: '#67E0E3',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'SO2',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_zb3_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb3_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb4() {
				// 基于准备好的dom，初始化echarts实例
				const fetch_zb4_privent=(privent)=>{
			fetch(`/zb4?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					var myChart = echarts.init(document.getElementById('zb42'));
					var v2 = data[0]['o3'] //要改的
					var v3 = 150 //总指标
					var v1 = v3 - v2

					option = {
						tooltip: {
							trigger: 'item',
						},
						series: [{

							type: 'pie',
							radius: ['60%', '70%'],
							color: '#9FE6B8',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'NO2',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_zb4_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb4_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb5() {
		const fetch_zb5_privent=(privent)=>{
			fetch(`/zb5?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('zb52'));
					var v2 = data[0]['co'] //要改的
					var v3 = 5 //总指标
					var v1 = v3 - v2
					option = {
						tooltip: {
							trigger: 'item',
						},
						series: [{

							type: 'pie',
							radius: ['60%', '70%'],
							color: '#FFDB5C',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'CO',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
				})}
				fetch_zb5_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb5_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
			}

			function zb6() {
				// 基于准备好的dom，初始化echarts实例
				const fetch_zb6_privent=(privent)=>{
			fetch(`/zb6?privent=${privent}`)
				.then(response=>response.json())
				.then(data=> {
					var myChart = echarts.init(document.getElementById('zb62'));
					var v2 = data[0]['no2'] //要改的
					var v3 = 150 //总指标
					var v1 = v3 - v2
					option = {
						tooltip: {
							trigger: 'item',
						},
						series: [{

							type: 'pie',
							radius: ['60%', '70%'],
							color: '#FB7293',
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: v2,
								name: 'O3',
								label: {
									normal: {
										formatter: v2 + '',
										textStyle: {
											fontSize: 20,
											color: '#fff',
										}
									}
								}
							}, {
								value: v1,
								label: {
									normal: {
										formatter: function (params) {
											return Math.round(v2 / v3 * 100) + '%'
										},
										textStyle: {
											color: '#aaa',
											fontSize: 12
										}
									}
								},
								itemStyle: {
									normal: {
										color: 'rgba(255,255,255,.2)'
									},
									emphasis: {
										color: '#fff'
									}
								},
							}]
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function () {
						myChart.resize();
					});
					})}
				fetch_zb6_privent('北京');
function handleProvinceNameChanged(event) {
  // 从事件对象中提取省份名称
  const newProvinceName = event.detail.provinceName;

  // 在这里使用newProvinceName更新图表
  fetch_zb6_privent(newProvinceName)
}

// 设置一个事件监听器来监听provinceNameChanged事件
window.addEventListener('provinceNameChanged', handleProvinceNameChanged);
				}
		}
	)