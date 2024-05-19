initializePage();
var myChart
var mapName = 'china';
var data = [

];

var geoCoordMap = {};
var toolTipData = [

];
function cleanUpResources() {
    // 停止已有的自动点击定时器
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null; // 清除定时器ID
    }

    // 解除myChart上绑定的所有事件监听器
    if (myChart) {
        myChart.off('click'); // 解除点击事件监听器
        myChart = null; // 清除myChart实例
    }

}
function initializePage() {
    // ...页面初始化的代码...

    cleanUpResources(); // 首先清理资源
    myChart = echarts.init(document.getElementById('map22')); // 重新初始化echarts实例
    startAutoClicking(); // 启动自动点击
}
/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function (v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;
});

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
option = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    title: {
        show: true,
        x: 'center',
        top: "10",
        textStyle: {
            color: "#fff",
            fontFamily: "等线",
            fontSize: 18,
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            if (typeof params.value[2] == 'undefined') {
                var toolTiphtml = '';
                for (var i = 0; i < toolTipData.length; i++) {
                    if (params.name === toolTipData[i].name) {
                        toolTiphtml += toolTipData[i].name + "：" + toolTipData[i].value;
                    }
                }

                // console.log(convertData(data))
                return toolTiphtml;
            } else {
                var toolTiphtml = '';
                for (var i = 0; i < toolTipData.length; i++) {
                    if (params.name === toolTipData[i].name) {
                        toolTiphtml += toolTipData[i].name + "：" + toolTipData[i].value;
                    }
                }


                return toolTiphtml;
            }
        },
        backgroundColor: "#fff",
        borderColor: "#333",
        padding: [5, 10],
        textStyle: {
            color: "#333",
            fontSize: "16"
        }
    },
    geo: {
        layoutCenter: ['45%', '48%'],//位置
        layoutSize: '100%',//大小
        show: true,
        map: mapName,
        roam: true,
        label: {
            normal: {
                show: false,
                textStyle: {
                    color: '#fff'
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                // shadowColor: 'rgba(128, 217, 248, 1)',
                shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
            },
            emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
            }
        }
    },
    series: [
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.9, //长宽比
            zoom: 1,
            showLegendSymbol: false,
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                },
            },
            roam: true,
            animation: false,
            data: data,
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(toolTipData),
            symbolSize: function (val) {
                return 15;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    color: "#fff"
                },
            },
            itemStyle: {
                normal: {
                    color: '#1DE9B6',
                    shadowBlur: 10,
                    shadowColor: '#1DE9B6',
                },
            },
            zlevel: 1,
        },
    ],
};
myChart.setOption(option);
var provinces = mapFeatures.map(function (v) {
    return v.properties.name;
});

// 自动点击部分




// 初始化并开始模拟点击循环
myChart.hideLoading(); // 确保调用hideLoading来隐藏加载动画

// 自动点击部分，确保地图加载并渲染完成后再调用

var autoClickInterval;
var currentIndex = 1;
// 开始自动轮播的函数
function startAutoClicking() {
    var intervalTime = 3000; // 定时器间隔设为3秒

    // 移除现有定时器
    if (autoClickInterval) clearInterval(autoClickInterval);

    // 设置新的自动点击定时器
    autoClickInterval = setInterval(autoClickProvince, intervalTime);
}

// 停止自动轮播的函数
function stopAutoClicking() {
    if (autoClickInterval) clearInterval(autoClickInterval);
}

// 重启自动轮播的函数
function resumeAutoClicking() {
    startAutoClicking();
}

// 自动点击省份的逻辑
function autoClickProvince() {
    if (currentIndex >= provinces.length) {
        currentIndex = 0; // 如果需要循环，则重置索引
    }

    var province = provinces[currentIndex]; // 获取当前省份的名称
    // 执行省份点击的动作
    myChart.dispatchAction({
        type: 'mapSelect',
        seriesIndex: 0,
        name: province
    });
    changeProvinceName(province)
    currentIndex++; // 移至下一个省份
}

// 图表元素（myChart）添加鼠标悬停和离开的事件监听
myChart.getZr().on('mouseover', function() {
    stopAutoClicking(); // 鼠标悬停时停止轮播
});

myChart.getZr().on('mouseout', function() {
    resumeAutoClicking(); // 鼠标离开时重启轮播
});

// 最后，确保在页面加载完毕或相应时机调用 startAutoClicking() 开始自动轮播
startAutoClicking();




// 确保数据和视图正确加载后再启动自动点击
setTimeout(startAutoClicking, 500);  // 5秒延迟确保地图完全加载
function changeProvinceName(provinceName) {
  // 检查当前省份名是否已经在处理中
  if (window.provinceName !== provinceName) {
    window.provinceName = provinceName;
    // 触发自定义事件
    const event = new CustomEvent('provinceNameChanged', { detail: { provinceName } });
    window.dispatchEvent(event);
  }
}
myChart.on('click', function (params) {
    changeProvinceName(params.name);
});




