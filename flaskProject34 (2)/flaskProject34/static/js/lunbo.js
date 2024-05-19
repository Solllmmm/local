function lunbo(){


	var lunbomyChart = echarts.init(document.getElementById("echart2"));

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

				let nameData = [];
				let timeData = [];
				let contentData = [];
				let contentData2 = [];
				let listData = [];
				let i=0
	            let len=30
				Object.keys(window.lunbo).forEach((key)=>{
					let region=window.lunbo[key]
					const date=new Date(region.pubTime)
					const month=(date.getMonth() + 1).toString().padStart(2, '0');
					const day = date.getDate().toString().padStart(2, '0');
					const formattedDate = `${month}-${day}`;
					i++
					if (fullmap[key]){
						nameData.push({
							name:fullmap[key],
							value:5
						});
						timeData.push({
							name:formattedDate,
							value:4
						});
						contentData2.push({
							name:region.category,
							value:4
						});
						contentData.push({
							name:region.aqi,
							value:6
						});
						listData.push({
							name:i+" ",
							value:1
						})
					}
				 return {
						  name: fullmap[key] || key,
						  aqi: region.aqi,
						  category: region.category,
						  pubTime: region.pubTime // 确保 pubTime 是存在的字段
						  // ...其他数据
						};
				})

				option = {
					backgroundColor: "rgba(247,247,247,0)",
					// tooltip: {
					// 	trigger: 'axis',
					// 	axisPointer: { // 坐标轴指示器，坐标轴触发有效
					// 		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					// 	}
					// },
					grid: {
						top: '-2%',
						left: '0%',
						right: '0%',
						bottom: '-5%',
						containLabel: true
					},
					xAxis: {
						show: false,
						type: 'value'
					},
					yAxis: [{
						type: 'category',
						position: 'right',
						inverse: true,
						axisLine: {
							position: 'right'
						},
						axisTick: {
							  show: false  // 隐藏刻度
							},
						axisLabel: {
							  show: true,
							  color: '#666', // 字体颜色
							  fontSize: '12' // 字体大小
							},
						show: false,
						data: ['', '', '', '', '', '', '', '', '', '', '']
					}],
					series: [{
						name: '列表序列号',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'insideLeft',
								formatter: function(e) {
									if (e.name === '') {
										return '';
									}
									return '{cirle|' + e.name + '}';
								},
								rich: {
									cirle: {
										width: 20,
										height: 20,
										borderRadius: 10,
										color: "#89ef78",
										align: "center",
										borderColor: "orange",
										borderWidth: 1,
										backgroundColor: "orange"
									}
								}
							}
						},
						itemStyle: {
								normal: {
								  barBorderRadius: [10, 10, 10, 10], // 添加圆角
								  color: "#cccccc"  // 柔和的条形颜色
								}
							  },
						data: [{
							name: '',
							value: 1,
							itemStyle: {
								normal: {
									color: "#89ef78"
								}
							}
						}].concat(listData.slice(0, 32))
					},
					{
						name: '省份',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter: function(e) {
									// console.log(e);
									return '{cirle|' + e.name + '}';
								},
								rich: {
									cirle: {
										color: "#605e5e",
										// width:80,
										// height:40,
										// backgroundColor:"red",
										// align:"center",
									}
								}
							}
						},
						itemStyle: {
							normal: {
								color: "rgb(145,239,92)"
							}
						},
						data: ([{
							name: "省份",
							value: 4,
							itemStyle: {
								normal: {
									color: "#89ef78"
								}
							},
						}]).concat(nameData.slice(0, 10))
					}, {
						name: '时间',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter: function(e) {
									// console.log(e);
									return '{cirle|' + e.name + '}';
								},
								rich: {
									cirle: {
										color: "#605e5e",
										width:120,
										height:40,
										// backgroundColor:"red",
										align:"center",
									}
								}
							}
						},
						itemStyle: {
							normal: {
								color: "rgb(145,239,92)"
							}
						},
						data: ([{
							name: "时间",
							value: 4,
							itemStyle: {
								normal: {
									color: "#89ef78"
								}
							},
						}]).concat(timeData.slice(0, 10))
					}, {
						name: 'aqi',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter: function(e) {
									// console.log(e);
									let len = e.name.length;
									if (len > 40) {
										e.name = e.name.substring(0, 40) + "\n" + e.name.substring(40, len);
									}
									return '{cirle|' + e.name + '}';
								},
								rich: {
									cirle: {
										color: "#605e5e",
										// width: 100,
										// height:40,
										// backgroundColor:"red",
										// align: "center",
									}
								}
							}
						},
						itemStyle: {
							normal: {
								color: "rgb(145,239,92)"
							}
						},
						data: ([{
							name: "aqi",
							value: 7,
							itemStyle: {
								normal: {
									color: "#89ef78"
								}
							},
						}]).concat(contentData.slice(0, 10))
					},
					{
						name: '污染程度',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'inside',
								formatter: function(e) {
									// console.log(e);
									return '{cirle|' + e.name + '}';
								},
								rich: {
									cirle: {
										color: "#605e5e",
										width:120,
										height:40,
										// backgroundColor:"red",
										align:"center",
									}
								}
							}
						},
						itemStyle: {
							normal: {
								color: "rgb(145,239,92)"
							}
						},
						data: ([{
							name: "污染程度",
							value: 4,
							itemStyle: {
								normal: {
									color: "#89ef78"
								}
							},
						}]).concat(contentData2.slice(0, 10))
					}]
				};
				lunbomyChart.resize();
				//myChart.resize({width:536,height:320});
				  // 定义轮播更新数据的函数
				function updateDataForCarousel(startIndex, endIndex) {
				// 使用 Array.slice() 提取子数组，再使用 Array.sort() 对结果排序
				// sort 函数会对原数组进行排序，因此我们在排序前拷贝一份数据
				var sortedData = JSON.parse(JSON.stringify({
				  listData: listData.slice(startIndex, endIndex),
				  nameData: nameData.slice(startIndex, endIndex),
				  timeData: timeData.slice(startIndex, endIndex),
				  contentData: contentData.slice(startIndex, endIndex),
				  contentData2: contentData2.slice(startIndex, endIndex)
				}));

				// 根据 AQI 值降序排序
			  var indices = sortedData.contentData.map((item, index) => index);
			  indices.sort((a, b) => {
				var aValue = parseInt(sortedData.contentData[a].name, 10);
				var bValue = parseInt(sortedData.contentData[b].name, 10);
				return bValue - aValue;
			  });

				// 根据排序后的索引更新数据（确保对应索引的数据项存在）
			  for (var seriesIndex = 0; seriesIndex < option.series.length; seriesIndex++) {
				if (!option.series[seriesIndex].data) {
				  option.series[seriesIndex].data = []; // 初始化如果没有数据的话
				}
				var seriesKey = Object.keys(sortedData)[seriesIndex];
				var newSeriesData = indices.map((sortIndex) => {
				  var item = sortedData[seriesKey] && sortedData[seriesKey][sortIndex]; // 确保条目存在
				  return item ? {
					name: item.name || '',
					value: item.value || 0,
					itemStyle: item.itemStyle || {}
				  } : undefined;
				}).filter(item => item !== undefined); // 移除 undefined 条目
				option.series[seriesIndex].data = newSeriesData;
			  }

				// 更新图表
				lunbomyChart.setOption(option);
				}
							 // 定义和启动初始轮播
			  let count1 = 0;
			  let count2 = 10;1
			   // 检查是否存在有效定时器
			  ltimeTicket = setInterval(function() {
				updateDataForCarousel(count1, count2);
				count1 += 10;
				count2 += 10;
				if (count2 > len) {
				  count1 = 0;
				  count2 = 10;
				}
			  }, 3000); // 将频率设置为3秒，或你需要的其他值
			 if (ltimeTicket) {
			  // 如果已经有定时器在运行中，则清除并重新开始
			  clearInterval(ltimeTicket);
			  ltimeTicket = setInterval(function() {
				updateDataForCarousel(count1, count2);
				count1 += 10;
				count2 += 10;
				if (count2 > len) {
				  count1 = 0;
				  count2 = 10;
				}
			  }, 3000);
			}

			  lunbomyChart.on('mouseover', function() {
				  if (ltimeTicket) {
					  clearInterval(ltimeTicket);
				  }
			  });

			  lunbomyChart.on('mouseout', function() {
				   if (ltimeTicket) {
					clearInterval(ltimeTicket); // 鼠标移开后清除现有定时器
				  }
					ltimeTicket = setInterval(function() {
					updateDataForCarousel(count1, count2);
					  count1 += 10;
					  count2 += 10;
					  if (count2 > len) {
						count1 = 0;
						count2 = 10;
					  }
			}, 2500);
  });

  // 调用一次以初始化轮播数据
  updateDataForCarousel(count1, count2);
				}

window.startlunbo=lunbo
