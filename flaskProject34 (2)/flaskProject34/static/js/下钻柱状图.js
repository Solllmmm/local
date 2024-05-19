
const fullmapxz={
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

function zz() {
    var chartDomz = document.getElementById('echart3');
    myChartxz = echarts.init(chartDomz);
    // 转换字典为列表并进行映射和排序
let sortedCities = Object.keys(window.zhuzhuang)
  .map(key => ({
    shortname: key,  // 城市缩写，如 'nm'
    fullname: fullmapxz[key], // 完整城市名，使用全映射进行转换
    aqi: window.zhuzhuang[key].aqi // 城市对应的 AQI 值
  }))
  .sort((a, b) => b.aqi - a.aqi) // 根据 AQI 值降序排序
  .slice(0, 5); // 取排序后的前10项

let xzx=sortedCities.map(itemxz=>{
    return itemxz.fullname
})
let xzy=sortedCities.map(itemxz=>{
    return {
        value:itemxz.aqi,
        name:itemxz.fullname
    }
})


    optionxz = {
    title: { // 添加标题

        left: 'center',
        textStyle: {
            						 fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial', // 字体家族
            fontSize: 18 // 标题字体大小
        }
    },

    xAxis: {
        data: xzx,
        axisLabel: {
            textStyle: {
                color: '#ffffff' // x轴字体颜色
            },
            rotate: 0, // x轴标签旋转角度
            interval: 0 // 设置为0保证每个标签都显示
        },
        axisLine: {
            lineStyle: {
                color: '#ffffff' // x轴线的颜色
            }
        }
    },
    yAxis: {
        axisLabel: {
            textStyle: {
            fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial' // 字体家族
            }
        },
        axisLine: {
            lineStyle: {
                color: '#333' // y轴线的颜色
            }
        },
        splitLine: {show: false} // 不显示y轴的网格线
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0)', // 背景颜色
        textStyle: {
            color: '#fdfdfd' // 文本颜色
        },
        borderColor: 'rgba(170,170,170,0)', // 边框颜色
        borderWidth: 1,
        formatter: function (params) {
            return `${params.name}<br/>AQI: ${params.value}`;
        }
    },
    series: {
        type: 'bar',
        data: xzy,
        itemStyle: {
            color: function (params) { // 为每个柱子设置不同的颜色
                return categoryStyles[params.data.name] || '#58d7c4';
            },
            barBorderRadius: 4 // 柱子圆角
        },
        showBackground: true, // 显示背景
        backgroundStyle: {
            color: 'rgba(220,220,220,0)' // 背景颜色
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
};
    myChartxz.setOption(optionxz)

 myChartxz.on('click',function (event){
     if(event.componentType==='series'){
         const citynamexz=fullmapxz[event.name]||event.name;
         fetch(`prodata?pro=${citynamexz}`)
             .then(response=>response.json())
             .then(xzdata=>{
                 xzdata1=xzdata.map(itemxz=>{
                     return {
                         citynamexz:itemxz.city_name,
                         aqixz:itemxz.xq.now.aqi
                     }
                 })
                 xzdata2=xzdata1.sort((a,b)=>b.aqixz-a.aqixz).slice(0,5)
                 const subdata=xzdata2.map(itemxz=>{
                     return [itemxz.citynamexz,itemxz.aqixz]
                 })

                     myChartxz.setOption({
                         title: { // 添加标题

        left: 'center',
        textStyle: {
            						 fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial', // 字体家族
            fontSize: 18 // 标题字体大小
        }
    },
                  xAxis: {
                    data: subdata.map(function (itemxz) {
                      return itemxz[0];
                    }
                    ),
                      axisLabel: {
            textStyle: {
                color: '#ffffff' // x轴字体颜色
            },
            rotate: 0, // x轴标签旋转角度
            interval: 0 // 设置为0保证每个标签都显示
        },
        axisLine: {
            lineStyle: {
                color: '#ffffff' // x轴线的颜色
            }
        }
                  },
                           yAxis: {
        axisLabel: {
            textStyle: {
            fontWeight: 'bold', // 字体粗细
            color: "rgba(255,255,255,1)",
            fontFamily: 'Arial' // 字体家族
            }
        },
        axisLine: {
            lineStyle: {
                color: '#333' // y轴线的颜色
            }
        },
        splitLine: {show: false} // 不显示y轴的网格线
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0)', // 背景颜色
        textStyle: {
            color: '#fdfdfd' // 文本颜色
        },
        borderColor: 'rgba(170,170,170,0)', // 边框颜色
        borderWidth: 1,
        formatter: function (params) {
            return `${params.name}<br/>AQI: ${params.value}`;
        }
    },
                  series: {
                    type: 'bar',
                    id: 'sales',
                    data: subdata.map(function (itemxz) {
                      return itemxz[1];
                    }),
                    universalTransition: {
                      enabled: true,
                      divideShape: 'clone'
                    },
                      itemStyle: {
            color: function (params) { // 为每个柱子设置不同的颜色
                return categoryStyles[params.data.name] || '#58d7c4';
            },
            barBorderRadius: 4 // 柱子圆角
        },
                      showBackground: true, // 显示背景
        backgroundStyle: {
            color: 'rgba(220,220,220,0)' // 背景颜色
        }
                  },
                             grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
                  graphic: [
                    {
                      type: 'text',
                      left: 50,
                      top: 20,
                      style: {
                        text: 'Back',
                        fontSize: 18
                      },
                      onclick: function () {
                        myChartxz.setOption(optionxz,true);
                      }
                    }
                  ]
                },true);
             })
     }
 })
}

window.startxz=zz