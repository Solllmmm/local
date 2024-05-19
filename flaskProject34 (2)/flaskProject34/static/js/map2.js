function showLoadingAnimation() {
  document.querySelector('.animbox').style.display = 'block';
}
function hideLoadingAnimation() {
  document.querySelector('.animbox').style.display = 'none';
}

const citynamemap={'福州': '福州市', '厦门': '厦门市', '莆田': '莆田市', '三明': '三明市', '泉州': '泉州市', '漳州': '漳州市',
    '南平': '南平市', '龙岩': '龙岩市', '宁德': '宁德市', '大兴安岭地区': '大兴安岭地区', '合肥': '合肥市', '芜湖': '芜湖市', '蚌埠': '蚌埠市',
    '淮南': '淮南市', '马鞍山': '马鞍山市', '淮北': '淮北市', '铜陵': '铜陵市', '安庆': '安庆市', '黄山': '黄山市', '滁州': '滁州市', '阜阳': '阜阳市',
    '宿州': '宿州市', '六安': '六安市', '亳州': '亳州市', '池州': '池州市', '宣城': '宣城市', '兰州': '兰州市', '嘉峪关': '嘉峪关市', '金昌': '金昌市',
    '白银': '白银市', '天水': '天水市', '武威': '武威市', '张掖': '张掖市', '平凉': '平凉市', '酒泉': '酒泉市', '庆阳': '庆阳市', '定西': '定西市',
    '陇南': '陇南市', '临夏州': '临夏回族自治州', '甘南州': '甘南藏族自治州', '广州': '广州市', '韶关': '韶关市', '深圳': '深圳市', '珠海': '珠海市',
    '汕头': '汕头市', '佛山': '佛山市', '江门': '江门市', '湛江': '湛江市', '茂名': '茂名市', '肇庆': '肇庆市', '惠州': '惠州市', '梅州': '梅州市',
    '汕尾': '汕尾市', '河源': '河源市', '阳江': '阳江市', '清远': '清远市', '东莞': '东莞市', '中山': '中山市', '潮州': '潮州市', '揭阳': '揭阳市',
    '云浮': '云浮市', '南宁': '南宁市', '柳州': '柳州市', '桂林': '桂林市', '梧州': '梧州市', '北海': '北海市', '防城港': '防城港市', '钦州': '钦州市',
    '贵港': '贵港市', '玉林': '玉林市', '百色': '百色市', '贺州': '贺州市', '河池': '河池市', '来宾': '来宾市', '崇左': '崇左市', '贵阳': '贵阳市',
    '六盘水': '六盘水市', '遵义': '遵义市', '安顺': '安顺市', '铜仁地区': '铜仁市', '黔西南州': '黔西南布依族苗族自治州', '毕节': '毕节市',
    '黔东南州': '黔东南苗族侗族自治州', '黔南州': '黔南布依族苗族自治州', '海口': '海口市', '三亚': '三亚市', '石家庄': '石家庄市', '唐山': '唐山市',
    '秦皇岛': '秦皇岛市', '邯郸': '邯郸市', '邢台': '邢台市', '保定': '保定市', '张家港': '张家界市', '承德': '承德市', '沧州': '沧州市', '廊坊': '廊坊市',
    '衡水': '衡水市', '哈尔滨': '哈尔滨市', '齐齐哈尔': '齐齐哈尔市', '鸡西': '鸡西市', '鹤岗': '鹤岗市', '双鸭山': '双鸭山市', '大庆': '大庆市', '伊春': '伊春市',
    '佳木斯': '佳木斯市', '七台河': '七台河市', '牡丹江': '牡丹江市', '黑河': '黑河市', '绥化': '绥化市', '郑州': '郑州市', '开封': '开封市', '洛阳': '洛阳市',
    '平顶山': '平顶山市', '安阳': '安阳市', '鹤壁': '鹤壁市', '新乡': '新乡市', '焦作': '焦作市', '濮阳': '濮阳市', '许昌': '许昌市', '漯河': '漯河市',
    '三门峡': '三门峡市', '南阳': '南阳市', '商丘': '商丘市', '信阳': '信阳市', '周口': '周口市', '驻马店': '驻马店市', '武汉': '武汉市', '黄石': '黄石市',
    '十堰': '十堰市', '宜昌': '宜昌市', '襄阳': '襄阳市', '鄂州': '鄂州市', '荆门': '荆门市', '孝感': '孝感市', '荆州': '荆州市', '黄冈': '黄冈市',
    '咸宁': '咸宁市', '随州': '随州市', '恩施州': '恩施土家族苗族自治州', '长沙': '长沙市', '株洲': '株洲市', '湘潭': '湘潭市', '衡阳': '衡阳市', '邵阳': '邵阳市',
    '岳阳': '岳阳市', '常德': '常德市', '益阳': '益阳市', '郴州': '郴州市', '永州': '永州市', '怀化': '怀化市', '娄底': '娄底市', '湘西州': '湘西土家族苗族自治州',
    '南京': '南京市', '无锡': '无锡市', '徐州': '徐州市', '常州': '常州市', '苏州': '苏州市', '南通': '南通市', '连云港': '连云港市', '淮安': '淮安市',
    '盐城': '盐城市', '扬州': '扬州市', '镇江': '镇江市', '泰州': '泰州市', '宿迁': '宿迁市', '南昌': '南昌市', '景德镇': '景德镇市', '萍乡': '萍乡市',
    '九江': '九江市', '新余': '新余市', '鹰潭': '鹰潭市', '赣州': '赣州市', '吉安': '吉安市', '宜春': '宜春市', '抚州': '抚州市', '上饶': '上饶市',
    '长春': '长春市', '吉林': '吉林省', '四平': '四平市', '辽源': '辽源市', '通化': '通化市', '白山': '白山市', '松原': '松原市', '白城': '白城市',
    '延边州': '延边朝鲜族自治州', '沈阳': '沈阳市', '大连': '大连市', '鞍山': '鞍山市', '抚顺': '抚顺市', '本溪': '本溪市', '丹东': '丹东市',
    '锦州': '锦州市', '营口': '营口市', '阜新': '阜新市', '辽阳': '辽阳市', '盘锦': '盘锦市', '铁岭': '铁岭市', '朝阳': '朝阳市', '葫芦岛': '葫芦岛市',
    '呼和浩特': '呼和浩特市', '包头': '包头市', '乌海': '乌海市', '赤峰': '赤峰市', '通辽': '通辽市', '鄂尔多斯': '鄂尔多斯市', '呼伦贝尔': '呼伦贝尔市',
    '巴彦淖尔': '巴彦淖尔市', '乌兰察布': '乌兰察布市', '兴安盟': '兴安盟', '锡林郭勒盟': '锡林郭勒盟', '阿拉善盟': '阿拉尔市', '银川': '银川市',
    '石嘴山': '石嘴山市', '吴忠': '吴忠市', '固原': '固原市', '中卫': '中卫市', '西宁': '西宁市', '海东地区': '海东市', '海北州': '海北藏族自治州',
    '黄南州': '黄南藏族自治州', '海南州': '海南省', '果洛州': '果洛藏族自治州', '玉树州': '玉树藏族自治州', '海西州': '海西蒙古族藏族自治州', '济南': '济南市',
    '青岛': '青岛市', '淄博': '淄博市', '枣庄': '枣庄市', '东营': '东营市', '烟台': '烟台市', '潍坊': '潍坊市', '济宁': '济宁市', '泰安': '泰安市',
    '威海': '威海市', '日照': '日照市', '莱芜': '莱芜市', '临沂': '临沂市', '德州': '德州市', '聊城': '聊城市', '滨州': '滨州市', '菏泽': '菏泽市',
    '太原': '太原市', '大同': '大同市', '阳泉': '阳泉市', '长治': '长治市', '晋城': '晋城市', '朔州': '朔州市', '晋中': '晋中市', '运城': '运城市',
    '忻州': '忻州市', '临汾': '临汾市', '吕梁': '吕梁市', '西安': '西安市', '铜川': '铜川市', '宝鸡': '宝鸡市', '咸阳': '咸阳市', '渭南': '渭南市',
    '延安': '延安市', '汉中': '汉中市', '榆林': '榆林市', '安康': '安康市', '商洛': '商洛市', '成都': '成都市', '自贡': '自贡市', '攀枝花': '攀枝花市',
    '泸州': '泸州市', '德阳': '德阳市', '绵阳': '绵阳市', '广元': '广元市', '遂宁': '遂宁市', '内江': '内江市', '乐山': '乐山市', '南充': '南充市',
    '眉山': '眉山市', '宜宾': '宜宾市', '广安': '广安市', '达州': '达州市', '雅安': '雅安市', '巴中': '巴中市', '资阳': '资阳市', '阿坝州': '阿坝藏族羌族自治州',
    '甘孜州': '甘孜藏族自治州', '凉山州': '凉山彝族自治州', '乌鲁木齐': '乌鲁木齐市', '克拉玛依': '克拉玛依市', '吐鲁番地区': '吐鲁番地区', '哈密地区': '哈密地区',
    '昌吉州': '昌吉回族自治州', '阿克苏地区': '阿克苏地区', '克孜勒苏州': '克孜勒苏柯尔克孜自治州', '喀什地区': '喀什地区', '和田地区': '和田地区',
    '伊犁哈萨克州': '伊犁哈萨克自治州', '塔城地区': '塔城地区', '阿勒泰地区': '阿勒泰地区', '石河子': '石河子市', '五家渠': '五家渠市', '昆明': '昆明市',
    '曲靖': '曲靖市', '玉溪': '玉溪市', '保山': '保山市', '昭通': '昭通市', '丽江': '丽江市', '普洱': '普洱市', '临沧': '临沧市', '楚雄州': '楚雄彝族自治州',
    '红河州': '红河哈尼族彝族自治州', '文山州': '文山壮族苗族自治州', '西双版纳州': '西双版纳傣族自治州', '大理州': '大理白族自治州', '德宏州': '德宏傣族景颇族自治州',
    '怒江州': '怒江傈僳族自治州', '迪庆州': '迪庆藏族自治州', '杭州': '杭州市', '宁波': '宁波市', '温州': '温州市', '嘉兴': '嘉兴市', '湖州': '湖州市',
    '绍兴': '绍兴市', '金华': '金华市', '衢州': '衢州市', '舟山': '舟山市', '台州': '台州市', '丽水': '丽水市', '拉萨': '拉萨市', '昌都': '昌都市',
    '山南': '山南地区', '日喀则': '日喀则市', '那曲地区': '那曲地区', '阿里地区': '阿里地区', '林芝': '林芝市', '重庆': '重庆市', '北京': '北京市', '天津': '天津市',
    '上海': '上海市'}

const provinceNameMap = {
    '新疆维吾尔自治区': '新疆',
    '西藏自治区':'西藏',
  '青海省':'青海',
  '甘肃省':'甘肃',
  '内蒙古自治区':'内蒙古',
  '宁夏回族自治区':'宁夏',
  '云南省':'云南',
  '广西壮族自治区':'广西',
  '贵州省':'贵州',
  '重庆市':'重庆',
  '山西省':'山西',
  '陕西省':'陕西',
  '湖北省':'湖北',
  '湖南省':'湖南',
  '广东省':'广东',
  '河南省':'河南',
  '安徽省':'安徽',
  '江西省':'江西',
  '福建省':'福建',
  '浙江省':'浙江',
  '江苏省':'江苏',
  '山东省':'山东',
  '河北省':'河北',
  '北京市':'北京',
  '天津市':'天津',
  '辽宁省':'辽宁',
  '吉林省':'吉林',
  '黑龙江省':'黑龙江',
  '海南省':'海南',
    '四川省':'四川'
};

//各省份的地图json文件
var provinces = {
    '上海': '../static/data/data-1482909900836-H1BC_1WHg.json',
    '河北': '../static/data/data-1482909799572-Hkgu_yWSg.json',
    '山西': '../static/data/data-1482909909703-SyCA_JbSg.json',
    '内蒙古': '../static/data/data-1482909841923-rkqqdyZSe.json',
    '辽宁': '../static/data/data-1482909836074-rJV9O1-Hg.json',
    '吉林': '../static/data/data-1482909832739-rJ-cdy-Hx.json',
    '黑龙江': '../static/data/data-1482909803892-Hy4__J-Sx.json',
    '江苏': '../static/data/data-1482909823260-HkDtOJZBx.json',
    '浙江': '../static/data/data-1482909960637-rkZMYkZBx.json',
    '安徽': '../static/data/data-1482909768458-HJlU_yWBe.json',
    '福建': '../static/data/data-1478782908884-B1H6yezWe.json',
    '江西': '../static/data/data-1482909827542-r12YOJWHe.json',
    '山东': '../static/data/data-1482909892121-BJ3auk-Se.json',
    '河南': '../static/data/data-1482909807135-SJPudkWre.json',
    '湖北': '../static/data/data-1482909813213-Hy6u_kbrl.json',
    '湖南': '../static/data/data-1482909818685-H17FOkZSl.json',
    '广东': '../static/data/data-1482909784051-BJgwuy-Sl.json',
    '广西': '../static/data/data-1482909787648-SyEPuJbSg.json',
    '海南': '../static/data/data-1482909796480-H12P_J-Bg.json',
    '四川': '../static/data/data-1482909931094-H17eKk-rg.json',
    '贵州': '../static/data/data-1482909791334-Bkwvd1bBe.json',
    '云南': '../static/data/data-1482909957601-HkA-FyWSx.json',
    '西藏': '../static/data/data-1482927407942-SkOV6Qbrl.json',
    '陕西': '../static/data/data-1482909918961-BJw1FyZHg.json',
    '甘肃': '../static/data/data-1482909780863-r1aIdyWHl.json',
    '青海': '../static/data/data-1482909853618-B1IiOyZSl.json',
    '宁夏': '../static/data/data-1482909848690-HJWiuy-Bg.json',
    '新疆': '../static/data/data-1482909952731-B1YZKkbBx.json',
    '北京': '../static/data/data-1482818963027-Hko9SKJrg.json',
    '天津': '../static/data/data-1482909944620-r1-WKyWHg.json',
    '重庆': '../static/data/data-1482909775470-HJDIdk-Se.json',
    '香港': '../static/data/data-1461584707906-r1hSmtsx.json',
    '澳门': '../static/data/data-1482909771696-ByVIdJWBx.json'
};

//各省份的数据
const fetchdata=()=>{
    // 显示加载动画
    showLoadingAnimation();

fetch(`getdata1`)
    .then(response=>response.json())
    .then(data1 =>{
        window.zhuzhuang=data1
        window.lunbo=data1
        window.bindata=data1
        // window.startlunbo()
        window.startll()
        window.startxz()
        window.bin1()
var allData = [
        { name: '内蒙古自治区', value: data1['nm']['aqi'] },
        { name: '黑龙江省', value: data1['hlj']['aqi'] },
        { name: '吉林省', value: data1['jl']['aqi'] },
        { name: '辽宁省', value: data1['ln']['aqi'] },
        { name: '河北省', value: data1['hb']['aqi'] },
        { name: '北京市', value: data1['bj']['aqi'] },
        { name: '山西省', value: data1['sx']['aqi'] },
        { name: '山东省', value: data1['sd']['aqi'] },
        { name: '天津市', value: data1['tj']['aqi'] },
        { name: '河南省', value:  data1['hen']['aqi']},
        { name: '安徽省', value: data1['ah']['aqi'] },
        { name: '江苏省', value: data1['js']['aqi'] },
        { name: '陕西省', value: data1['shx']['aqi'] },
        { name: '湖南省', value: data1['hn']['aqi'] },
        { name: '湖北省', value: data1['hub']['aqi'] },
        { name: '江西省', value: data1['jx']['aqi'] },
        { name: '福建省', value: data1['fj']['aqi'] },
        { name: '浙江省', value: data1['zj']['aqi'] },
        { name: '广东省', value: data1['gd']['aqi'] },
        { name: '上海市', value: data1['sh']['aqi'] },
        { name: '重庆市', value: data1['cq']['aqi'] },
        { name: '四川省', value: data1['sc']['aqi'] },
        { name: '贵州省', value: data1['gz']['aqi'] },
        { name: '云南省', value: data1['yn']['aqi'] },
        { name: '广西壮族自治区', value: data1['gx']['aqi'] },
        { name: '青海省', value: data1['qh']['aqi'] },
        { name: '甘肃省', value: data1['gs']['aqi'] },
        { name: '新疆维吾尔自治区', value: data1['xj']['aqi'] },
        { name: '西藏自治区', value: data1['xz']['aqi'] },
          { name: '宁夏回族自治区', value: data1['nx']['aqi'] },
          { name: '海南省', value: data1['hnan']['aqi'] },
      ];

var chartDom = document.getElementById('map');
mapmyChart = echarts.init(chartDom);
var lastClickTime = 0;
var delay = 250; // 毫秒


loadMap('../static/data/data-1527045631990-r1dZ0IM1X.json', 'china',allData); //初始化全国地图
        // 隐藏加载动画
        hideLoadingAnimation();

 window.ceng=1
var timeFn = null;
var zoomLevel = 1;
//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图

mapmyChart.on('click', function(params) {
    clearTimeout(timeFn);
    var clickTime = new Date().getTime();
    if (clickTime - lastClickTime < delay) {
        // 如果两次点击的时间小于阈值，则认为是双击事件，忽略这次单击
        return;
    }
    lastClickTime = clickTime;
    if (window.ceng!==2){

    // ceng=ceng+1//上锁
    mapmyChart.setOption({
        series: [{
            zoom: zoomLevel + 0.8
        }]
    })
    }else {
        window.cityname=params.name
        window.updateCharts()
        window.up()
        window.yibiaopan()
    }

    //获取第一层点击后的城市
    // 延迟200毫秒后执行
    if (window.ceng!==2){
    timeFn=setTimeout(function() {
        var name = params.name; //地区name
        var dbName = provinceNameMap[name] || name
        var mapCode = provinces[dbName]; //地区的json数据

 // 显示加载动画
    showLoadingAnimation();
    fetch(`prodata?pro=${name}`)
        .then(response=>response.json())
        .then(citydata=>{
            window.zb=citydata
            window.shengfengdata=citydata
            window.startll1()
            window.bindata2=citydata
            window.bin2()
                let result=citydata.map(item=>{
                    return {
                        'name':item.city_name,
                        'value':item.xq.now.aqi
                    }
                })

        loadMap(mapCode, dbName,result);
                // 隐藏加载动画
        hideLoadingAnimation();
        visualizeTopFive(citydata);
        })
    }, 500)
    window.ceng = window.ceng + 1//上锁
    }


});



// 绑定双击事件，返回全国地图
mapmyChart.on('dblclick', function(params) {
    window.bin1()
    window.startll()
    clearTimeout(timeFn);
    clearInterval(timer);
    lastClickTime = 0;
    if (window.ceng!==1){
        window.ceng=window.ceng-1//解锁
    mapmyChart.setOption({
        series: [{
            zoom: zoomLevel - 0.4 // 缩小地图
        }]
    })
    visualizeTopFive(allData);
    }
    // 延迟200毫秒后执行
    setTimeout(function() {
        //返回全国地图
        loadMap('../static/data/data-1527045631990-r1dZ0IM1X.json', 'china',allData);
    }, 200);
});

/**
 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
 @params {String} mapCode:json数据的地址
 @params {String} name: 地图名称
 */

function loadMap(mapCode, name,shuju) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                tooltip : {
                    trigger: 'item',
                    backgroundColor:'rgba(255,255,255,0)',
                    formatter:function(params){
                        var dataItem = shuju.find(item => item.name === params.name);
                        var value = dataItem ? dataItem.value : '';
                        let level;
                        let normal;
                        let teshu;
                        if (value <= 50) {
                            level = '优' + ' ' + `${value}`
                            normal = '空气质量令人满意，基本无空气污染'
                            teshu = '各类人群可正常活动'
                        } else if (50 < value && value <= 100) {
                            level = '良' + ' ' + `${value}`
                            normal = '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响'
                            teshu = '极少数异常敏感人群应减少户外活动'
                        } else if (101 < value && value <= 150) {
                            level = '轻度污染' + ' ' + `${value}`
                            normal = '易感人群症状有轻度加剧，健康人群出现刺激症状'
                            teshu = '儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼'
                        } else if (151 < value && value <= 200) {
                            level = '中度污染' + ' ' + `${value}`
                            normal = '进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响'
                            teshu = '儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动'
                        } else if (201 < value && value <= 300) {
                            level = '重度污染' + ' ' + `${value}`
                            normal = '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状'
                            teshu = '儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动'
                        } else if (301 < value) {
                            level = '严重污染' + ' ' + `${value}`
                            normal = '健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病'
                            teshu = '儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动'
                        }
                        return `
                        <div style='width: auto; font-size: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); color: #000; background: #fff; border-radius: 4px; z-index: 9;'>  
                          <div style='padding: 8px 10px; border-bottom: 1px solid #eee;'>${params.name}</div>  
                          <div style='padding: 8px 10px; color: #808492;'>  
                            <i style='display: inline-block; width: 6px; height: 6px; background: #396fff; border-radius: 50%; margin-right: 5px;'></i>  
                            <span>空气质量：${level}</span>  
                          </div>  
                          <div style='padding: 8px 10px; color: #808492;'>  
                            <i style='display: inline-block; width: 6px; height: 6px; background: #396fff; border-radius: 50%; margin-right: 5px;'></i>  
                            <span>对人群：${normal}。</span>  
                          </div>  
                          <div style='padding: 8px 10px; color: #808492;'>  
                            <i style='display: inline-block; width: 6px; height: 6px; background: #396fff; border-radius: 50%; margin-right: 5px;'></i>  
                            <span>建议：${teshu}。</span>  
                          </div>  
                        </div>`

                    }
                },
                visualMap: {
                    type: 'continuous',
                    text: ['', ''],
                    showLabel: true,
                    left: '50',
                    min: 0,
                    max: 300,
                    inRange: {
                        color: ['#96D3F4', '#80C4EC', '#00B9E8', '#0083DA', '#0080DD','#1572C8' ,'#1A5FB6','#1E3D87']
                    },
                    splitNumber: 0
                },
                series: [{
                    name: 'MAP',
                    type: 'map',
                    mapType: name,
                    zoom:1.15,
                    selectedMode: 'false', //是否允许选中多个区域
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#000000' // 未选中地区的字体颜色
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#ffffff' // 选中地区的字体颜色
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#389BB7', // 地区边界线颜色
                            areaColor: '#fff', // 未选中地区的颜色
                        },
                        emphasis: {
                            areaColor: '#389BB7', // 选中地区的颜色
                            borderWidth: 0
                        }
                    },
                    data: shuju
                }]
            };
            mapmyChart.setOption(option);
            visualizeTopFive(shuju);
        } else {
            alert('无法加载该地图');
        }
    });
}


var timer; // 用于保存 setInterval 的 id
var isMouseOver = false; // 鼠标是否悬停的标志
function visualizeTopFive(shuju) {
    clearInterval(timer);

    const sortedData=shuju.sort((a, b) => b.value - a.value)
  // 根据'value'值对数据进行降序排序
  const topFiveData = sortedData.slice(0, 5);

  // 计数器，用于追踪当前正在展示的城市
  let currentCityIndex = 0;

  // 每三秒更新一次提示框的显示
  function updateTooltip() {
    if (currentCityIndex === topFiveData.length) {
      currentCityIndex = 0; // 重新开始
    }
    // 获取当前城市的信息
    const city = topFiveData[currentCityIndex];
    // 模拟鼠标移到当前城市上以显示tooltip

    mapmyChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,    // series的索引
        dataIndex: mapmyChart.getOption().series[0].data.findIndex(data => data.name === city.name) // 数据项的索引，也可以直接是数据项的名称name
    });
    // 更新计数器
    currentCityIndex++;
  }
      // 开始间隔循环
  timer = setInterval(() => {
    // 如果鼠标没有悬停，才进行更新
    if (!isMouseOver) {
      updateTooltip();
    }
  },2000);
  // 为 myChart 增加鼠标悬停和移开的事件监听
  mapmyChart.on('mouseover', function () {
    isMouseOver = true; // 鼠标悬停时设置标志为 true
  });
    mapmyChart.on('mouseout', function () {
    isMouseOver = false; // 鼠标移开时设置标志为 false
  });

}
visualizeTopFive(allData);
    })}

fetchdata()
