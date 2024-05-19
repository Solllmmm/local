


    function bintu() {
        let l1=0
        let l2=0
        let l3=0
        let l4=0
        let l5 =0

Object.values(window.bindata).forEach(item => {
  switch(item.category) {
    case '优':
      l1 += 1;
      break;
    case '良':
      l2 += 1;
      break;
    case '轻度污染':
      l3 += 1;
      break;
    case '中度污染':
      l4 += 1;
      break;
    case '重度污染':
      l5 += 1;
      break;
  }
});
        let binshu=[
            {
        value:l1,name:'优'
        },
          {
        value:l2,name:'良'
        },
        {
        value:l3,name:'轻度污染'
        },
        {
        value:l4,name:'中度污染'
        },
        {
        value:l5,name:'重度污染'
        },
        ]
myChartbin=echarts.init(document.getElementById('echart1'))
optionbin = {
        // 设置动画效果


        // 设置标题
        title: {
            text: "空气质量情况占比",
            x: "center",
            y: "center",
            textStyle: {
                color: "rgba(255,255,255,1)",
                fontSize: 15,
                fontWeight: "normal",
                align: "center",
                width: "20px"
            },
        },

        // 设置系列数据
        series: [{
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "70%"],
            color: ["#58d7c4", "#67c3ea", "#29CFF2", "#FEE449", "#ff7300"],
            startAngle: 135,
            labelLine: {
                normal: {
                    length: 18
                }
            },
            label: {
                normal: {
                    formatter: "{b|{b}:}{per|{d}%} ",
                    backgroundColor: "rgba(255, 147, 38, 0)",
                    borderColor: "transparent",
                    borderRadius: 3,
                    rich: {
                        a: {
                            color: "#999",
                            lineHeight: 10,
                            align: "center"
                        },
                        hr: {
                            borderColor: "#aaa",
                            width: "100%",
                            borderWidth: 1,
                            height: 0
                        },
                        b: {
                            color: "#b3e5ff",
                            fontSize: 15,
                            lineHeight: 5
                        },
                        c: {
                            fontSize: 14,
                            color: "#eee"
                        },
                        per: {
                            color: "#FDF44E",
                            fontSize: 14,
                            padding: [2, 2],
                            borderRadius: 2
                        }
                    },
                    textStyle: {
                        color: "#fff",
                        fontSize: 16
                    }
                },
                emphasis: {
                    formatter: "{b|{b}:} {per|{d}%}  ",
                    backgroundColor: "rgba(255, 147, 38, 0)",
                    borderColor: "transparent",
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: "#999",
                            lineHeight: 22,
                            align: "center"
                        },
                        hr: {
                            borderColor: "#aaa",
                            width: "100%",
                            borderWidth: 1,
                            height: 0
                        },
                        b: {
                            color: "#fff",
                            fontSize: 16,
                            lineHeight: 33
                        },
                        c: {
                            fontSize: 14,
                            color: "#eee"
                        },
                        per: {
                            color: "#FDF44E",
                            fontSize: 16,
                            padding: [5, 6],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: binshu
        }]
    }
myChartbin.setOption(optionbin)
}



    function bintu2() {
        let l1=0
        let l2=0
        let l3=0
        let l4=0
        let l5 =0

window.bindata2.forEach(item => {
  switch(item.xq.now.category) {
    case '优':
      l1 += 1;
      break;
    case '良':
      l2 += 1;
      break;
    case '轻度污染':
      l3 += 1;
      break;
    case '中度污染':
      l4 += 1;
      break;
    case '重度污染':
      l5 += 1;
      break;
  }
});
        let binshu=[
            {
        value:l1,name:'优'
        },
          {
        value:l2,name:'良'
        },
        {
        value:l3,name:'轻度污染'
        },
        {
        value:l4,name:'中度污染'
        },
        {
        value:l5,name:'重度污染'
        },
        ]
myChartbin=echarts.init(document.getElementById('echart1'))
optionbin = {
        // 设置动画效果


        // 设置标题
        title: {
            text: "空气质量情况占比",
            x: "center",
            y: "center",
            textStyle: {
                color: "rgba(255,255,255,1)",
                fontSize: 15,
                fontWeight: "normal",
                align: "center",
                width: "20px"
            },
        },

        // 设置系列数据
        series: [{
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "70%"],
            color: ["#58d7c4", "#67c3ea", "#29CFF2", "#FEE449", "#ff7300"],
            startAngle: 135,
            labelLine: {
                normal: {
                    length: 18
                }
            },
            label: {
                normal: {
                    formatter: "{b|{b}:}{per|{d}%} ",
                    backgroundColor: "rgba(255, 147, 38, 0)",
                    borderColor: "transparent",
                    borderRadius: 3,
                    rich: {
                        a: {
                            color: "#999",
                            lineHeight: 10,
                            align: "center"
                        },
                        hr: {
                            borderColor: "#aaa",
                            width: "100%",
                            borderWidth: 1,
                            height: 0
                        },
                        b: {
                            color: "#b3e5ff",
                            fontSize: 15,
                            lineHeight: 5
                        },
                        c: {
                            fontSize: 14,
                            color: "#eee"
                        },
                        per: {
                            color: "#FDF44E",
                            fontSize: 14,
                            padding: [2, 2],
                            borderRadius: 2
                        }
                    },
                    textStyle: {
                        color: "#fff",
                        fontSize: 16
                    }
                },
                emphasis: {
                    formatter: "{b|{b}:} {per|{d}%}  ",
                    backgroundColor: "rgba(255, 147, 38, 0)",
                    borderColor: "transparent",
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: "#999",
                            lineHeight: 22,
                            align: "center"
                        },
                        hr: {
                            borderColor: "#aaa",
                            width: "100%",
                            borderWidth: 1,
                            height: 0
                        },
                        b: {
                            color: "#fff",
                            fontSize: 16,
                            lineHeight: 33
                        },
                        c: {
                            fontSize: 14,
                            color: "#eee"
                        },
                        per: {
                            color: "#FDF44E",
                            fontSize: 16,
                            padding: [5, 6],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: binshu
        }]
    }
myChartbin.setOption(optionbin,true)
}


window.bin1=bintu
window.bin2=bintu2