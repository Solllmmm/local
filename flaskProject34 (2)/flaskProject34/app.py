import time

import requests
from flask import Flask
from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from jinja2.utils import markupsafe
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, Numeric, Float
import json
import config
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from sqlalchemy import func
from flask_login import LoginManager, current_user
from flask_login import UserMixin
from flask_login import login_user, login_required, logout_user
import pymysql
from datetime import datetime
from flask import session

app = Flask(__name__)
app.config.from_object(config)
app.config['SECRET_KEY'] = "ewgnlwe&S;(12zd-+"
db = SQLAlchemy(app)
login_manager = LoginManager(app)
app.secret_key = 'aaaa'
login_manager.login_view = 'login'

ketlist = ['5c9152e310b8429190c351c1afb36611', '1a76f68285f8420baa00c25610e671b2', '87d0463dc18b4ef28d70c6d9e8bb227c',
           '90762fe42c2241309eaa7126af77d08f', '51e8a33edaf445cdb5127afea9141350']
key = '1a76f68285f8420baa00c25610e671b2'

# 连接mysql
conn = pymysql.connect(host='rm-cn-x0r3ngn3l00096do.rwlb.rds.aliyuncs.com', user='root', password='15213564963Zy')
cursor = conn.cursor()
cursor.execute('use student_test')
ys = {'万州': '万州区', '黔江': '黔江区', '永川': '永川区', '合川': '合川区', '涪陵': '涪陵区', '渝中': '渝中区',
      '大渡口': '大渡口区', '江北': '江北区', '沙坪坝': '沙坪坝区', '九龙坡': '九龙坡区', '南岸': '南岸区',
      '北碚': '北碚区', '渝北': '渝北区', '巴南': '巴南区', '长寿': '长寿区', '江津': '江津区', '綦江': '綦江区',
      '大足': '大足区', '璧山': '璧山区', '铜梁': '铜梁区', '潼南': '潼南区', '荣昌': '荣昌区', '开州': '开县',
      '梁平': '梁平县', '武隆': '武隆县', '城口': '城口县', '丰都': '丰都县', '垫江': '垫江县', '忠县': '忠县',
      '云阳': '云阳县', '奉节': '奉节县', '巫山': '巫山县', '巫溪': '巫溪县', '石柱': '石柱土家族自治县',
      '秀山': '秀山土家族苗族自治县', '酉阳': '酉阳土家族苗族自治县', '彭水': '彭水苗族土家族自治县', '重庆': '重庆',
      '北京': '北京', '东城': '东城区', '西城': '西城区', '朝阳': '朝阳区', '丰台': '丰台区', '石景山': '石景山区',
      '海淀': '海淀区', '顺义': '顺义区', '通州': '通州区', '大兴': '大兴区', '房山': '房山区',
      '门头沟': '门头沟区', '昌平': '昌平区', '平谷': '平谷区', '密云': '密云区', '怀柔': '怀柔区', '延庆': '延庆区',
      '黄埔': '黄浦区', '上海': '上海', '黄浦': '黄浦区', '徐汇': '徐汇区', '长宁': '长宁区', '静安': '静安区',
      '普陀': '普陀区', '虹口': '虹口区', '杨浦': '杨浦区', '闵行': '闵行区', '宝山': '宝山区', '嘉定': '嘉定区',
      '浦东新区': '浦东新区', '金山': '金山区', '松江': '松江区', '青浦': '青浦区', '奉贤': '奉贤区', '崇明': '崇明区',
      '和平': '和平区', '河东': '河东区',
      '河西': '河西区', '南开': '南开区', '河北': '河北区', '红桥': '红桥区', '东丽': '东丽区', '西青': '西青区',
      '津南': '津南区', '北辰': '北辰区', '武清': '武清区', '宝坻': '宝坻区', '滨海新区': '滨海新区', '宁河': '宁河县',
      '静海': '静海县', '蓟州': '蓟县', '天津': '天津', '南川': '南川区', '城六': '城六区'}


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.String(64), primary_key=True)
    user = db.Column(db.String(64))
    password = db.Column(db.String(64))

    def get_id(self):
        return self.id


class Breath_avg(db.Model):
    __tablename__ = 'breath_avg'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cityname = db.Column(db.String(64))
    pm2_5 = db.Column(db.Numeric(precision=13, scale=2))
    pm10 = db.Column(db.Numeric(precision=13, scale=2))
    so2 = db.Column(db.Numeric(precision=13, scale=2))
    no2 = db.Column(db.Numeric(precision=13, scale=2))
    co = db.Column(db.Float)
    o3 = db.Column(db.Float)


class Aqi_fenbu(db.Model):
    __tablename__ = 'aqi_fenbu'
    aqi_fenbu_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cityname = db.Column(db.String(64))
    aqi = db.Column(db.Integer)
    year = db.Column(db.Integer)
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)
    time = db.Column(db.String(64))


class Data(db.Model):
    __tablename__ = 'utf8'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    time = db.Column(db.String(64))
    cityname = db.Column(db.String(64))
    aqi = db.Column(db.Integer)
    pm2_5 = db.Column(db.Integer)
    pm10 = db.Column(db.Integer)
    so2 = db.Column(db.Integer)
    no2 = db.Column(db.Integer)
    co = db.Column(db.Integer)
    o3 = db.Column(db.Integer)
    primary_pollutant = db.Column(db.String(64))
    lng = db.Column(db.String(64))
    lat = db.Column(db.String(64))
    privent = db.Column(db.String(64))


class Avg(db.Model):
    __tablename__ = 'avg_aqi'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    time = db.Column(db.String(64))
    privent = db.Column(db.String(64))
    avg_aqi = db.Column(db.Integer)


class Jw(db.Model):
    __tablename__ = 'jingw'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cityname = db.Column(db.String(64))
    lng = db.Column(db.String(64))
    lat = db.Column(db.String(64))


class Year(db.Model):
    __tablename__ = 'avg_year'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cityname = db.Column(db.String(64))
    year = db.Column(db.Integer)
    avg_pm2_5 = db.Column(db.BigInteger)
    avg_pm10 = db.Column(db.BigInteger)
    avg_so2 = db.Column(db.BigInteger)
    avg_no2 = db.Column(db.BigInteger)
    avg_co = db.Column(db.BigInteger)
    avg_o3 = db.Column(db.BigInteger)


class Top10(db.Model):
    __tablename__ = 'top10'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cityname = db.Column(db.String(64))
    aqi = db.Column(db.Integer)
    time = db.Column(db.String(64))


class Location(db.Model):
    __tabloename__ = 'location'
    Location_ID = db.Column(db.String(64), primary_key=True)
    Location_Name_ZH = db.Column(db.String(64))
    Adm1_Name_ZH = db.Column(db.String(64))
    Adm2_Name_ZH = db.Column(db.String(64))


class Location2(db.Model):
    __tablename__ = 'location2'
    Location_ID = db.Column(db.String(64), primary_key=True)
    Location_Name_ZH = db.Column(db.String(64))
    Adm1_Name_ZH = db.Column(db.String(64))
    Adm2_Name_ZH = db.Column(db.String(64))


class Index2_jiesao(db.Model):
    __tablename__ = 'index2_jiesao'
    n = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    cityname = db.Column(db.String(64))
    aqi = db.Column(db.String(64))


class Index2_echarts2(db.Model):
    __tablename__ = 'index2_echarts2'
    echarts2_id = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    pm2_5 = db.Column(db.String(64))
    pm_10 = db.Column(db.String(64))
    so2 = db.Column(db.String(64))
    no2 = db.Column(db.String(64))
    co = db.Column(db.String(64))
    o3 = db.Column(db.String(64))


class Index2_echarts3(db.Model):
    __tablename__ = 'index2_echarts3'
    echarts3_id = db.Column(db.String(64), primary_key=True)
    date = db.Column(db.String(64))
    average_aqi = db.Column(db.String(64))
    privent = db.Column(db.String(64))


class Index2_echarts4(db.Model):
    __tablename__ = 'index2_echarts4'
    echarts4_id = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    year_month = db.Column(db.String(64))
    pm2_5 = db.Column(db.String(64))
    pm10 = db.Column(db.String(64))
    so2 = db.Column(db.String(64))
    no2 = db.Column(db.String(64))
    co = db.Column(db.String(64))
    o3 = db.Column(db.String(64))


class Index2_echarts5(db.Model):
    __tablename__ = 'index2_echarts5'
    echarts5_id = db.Column(db.String(64), primary_key=True)
    cityname = db.Column(db.String(64))
    privent = db.Column(db.String(64))
    good_air_days = db.Column(db.String(64))
    pollution_days = db.Column(db.String(64))
    aqi = db.Column(db.String(64))


class Index2_echarts6(db.Model):
    __tablename__ = 'index2_echarts6'
    echarts6_id = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    cityname = db.Column(db.String(64))
    pm2_5 = db.Column(db.String(64))
    pm10 = db.Column(db.String(64))
    so2 = db.Column(db.String(64))
    no2 = db.Column(db.String(64))
    co = db.Column(db.String(64))
    o3 = db.Column(db.String(64))


class Index2_echarts7(db.Model):
    __tablename__ = 'index2_echarts7'
    echarts7_id = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    air_lv = db.Column(db.String(64))
    total = db.Column(db.String(64))


class Zb(db.Model):
    __tablename__ = 'zb'
    zb_id = db.Column(db.String(64), primary_key=True)
    privent = db.Column(db.String(64))
    pm2_5 = db.Column(db.String(64))
    pm10 = db.Column(db.String(64))
    so2 = db.Column(db.String(64))
    no2 = db.Column(db.String(64))
    co = db.Column(db.String(64))
    o3 = db.Column(db.String(64))


# 获取根据时间筛选的平均aqi数据
@app.route('/getdata', methods=['GET'])
def main():  # put application's code here
    # 根据省份来计算api平均值
    date = request.args.get('date')
    avg_aqi = {}
    avg_aqi['nm'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%内蒙%')).first().avg_aqi
    avg_aqi['xj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%新疆%')).first().avg_aqi
    avg_aqi['hlj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%黑龙江%')).first().avg_aqi
    avg_aqi['jl'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%吉林%')).first().avg_aqi
    avg_aqi['ln'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%辽宁%')).first().avg_aqi
    avg_aqi['bj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%北京%')).first().avg_aqi
    avg_aqi['hb'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%河北%')).first().avg_aqi
    avg_aqi['sx'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%山西%')).first().avg_aqi
    avg_aqi['sd'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%山东%')).first().avg_aqi
    avg_aqi['tj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%天津%')).first().avg_aqi
    avg_aqi['hn'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%湖南%')).first().avg_aqi
    avg_aqi['ah'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%安徽%')).first().avg_aqi
    avg_aqi['js'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%江苏%')).first().avg_aqi
    avg_aqi['shx'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%陕西%')).first().avg_aqi
    avg_aqi['hen'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%河南%')).first().avg_aqi
    avg_aqi['hb'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%湖北%')).first().avg_aqi
    avg_aqi['jx'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%江西%')).first().avg_aqi
    avg_aqi['fj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%福建%')).first().avg_aqi
    avg_aqi['zj'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%浙江%')).first().avg_aqi
    avg_aqi['gd'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%广东%')).first().avg_aqi
    avg_aqi['sh'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%上海%')).first().avg_aqi
    avg_aqi['cq'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%重庆%')).first().avg_aqi
    avg_aqi['sc'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%四川%')).first().avg_aqi
    avg_aqi['gz'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%贵州%')).first().avg_aqi
    avg_aqi['yn'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%云南%')).first().avg_aqi
    avg_aqi['gx'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%广西%')).first().avg_aqi
    avg_aqi['qh'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%青海%')).first().avg_aqi
    avg_aqi['gs'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%甘肃%')).first().avg_aqi
    avg_aqi['xz'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%西藏%')).first().avg_aqi
    avg_aqi['nx'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%宁夏%')).first().avg_aqi
    avg_aqi['hnan'] = Avg.query.filter_by(time=date).filter(Avg.privent.like('%海南%')).first().avg_aqi
    return jsonify(avg_aqi)


@app.route('/getdata1', methods=['GET'])
def ss():
    avg_aqi = {}
    avg_aqi['nm'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101080101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['xj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101130101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hlj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101050101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['jl'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101060101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['ln'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101070101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['bj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101010100&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hb'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101090101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['sx'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101100809&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['sd'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101120101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['tj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101030100&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hn'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101250605&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['ah'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101220101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['js'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101190101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['shx'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101110101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hen'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101180101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hub'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101200101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['jx'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101240101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['fj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101230101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['zj'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101210101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['gd'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101280202&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['sh'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101020100&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['cq'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101040100&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['sc'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101270101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['gz'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101260101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['yn'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101290101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['gx'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101301212&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['qh'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101150101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['gs'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101160101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['xz'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101140101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['nx'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101170101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    avg_aqi['hnan'] = \
        (requests.get(f"https://devapi.qweather.com/v7/air/now?location=101310101&key={key}",
                      proxies={"http": None, "https": None})).json()['now']
    return jsonify(avg_aqi)


# 返回百度地图的经纬度
@app.route('/getbd', methods=['GET'])
def bd():
    jw = Jw.query.all()
    postion = {}
    for row in jw:
        postion[row.cityname] = [float(row.lng), float(row.lat)]
    return jsonify(postion)


# 获取城市的aqi，用于在百度地图上展示各个城市的aqi
@app.route('/getcity_aqi', methods=['GET'])
def aqi():
    date = request.args.get('date')
    city_aqi = Data.query.filter_by(time=date).all()
    comple_aqi = []
    for row in city_aqi:
        comple_aqi.append({'name': row.cityname, 'value': row.aqi})
    return jsonify(comple_aqi)


# 获取具体某一个城市的经纬度，用于百度地图上放大地点
@app.route('/get_ontcity_aqi', methods=['GET'])
def one_aqi():
    privent = request.args.get('privent')
    result = []
    result.append(float(Jw.query.filter_by(cityname=privent).first().lng))
    result.append(float(Jw.query.filter_by(cityname=privent).first().lat))
    return jsonify(result)


# 获取周、月、年的各项数据，以饼图+条形图
@app.route('/year_month', methods=['GET'])
def dmy():
    time_type = request.args.get('time_type')
    start_time = request.args.get('start_time')
    privent = request.args.get('privent')
    if time_type == 'week':
        par = Data.query.filter(Data.time.between(datetime.strptime(start_time, '%Y-%m-%d'),
                                                  datetime.strptime(start_time, '%Y-%m-%d') + relativedelta(
                                                      days=7))).filter(
            Data.cityname == privent)
        a = []
        time_1 = ['product']
        pm2_5 = ['pm2.5']
        pm10 = ['pm10']
        so2 = ['so2']
        no2 = ['no2']
        co = ['co']
        o3 = ['o3']
        for row in par:
            time_1.append(row.time.strftime("%Y-%m-%d"))
            pm2_5.append(row.pm2_5)
            pm10.append(row.pm10)
            so2.append(row.so2)
            no2.append(row.no2)
            co.append(row.co)
            o3.append(row.o3)
        a.append(time_1)
        a.append(pm2_5)
        a.append(pm10)
        a.append(so2)
        a.append(no2)
        a.append(co)
        a.append(o3)
        return jsonify(a)
    if time_type == 'month':
        par = Data.query.filter(Data.time.between(datetime.strptime(start_time, '%Y-%m-%d'),
                                                  datetime.strptime(start_time, '%Y-%m-%d') + relativedelta(
                                                      days=30))).filter(
            Data.cityname == privent)
        a = []
        time_1 = ['product']
        pm2_5 = ['pm2.5']
        pm10 = ['pm10']
        so2 = ['so2']
        no2 = ['no2']
        co = ['co']
        o3 = ['o3']
        for row in par:
            time_1.append(row.time.strftime("%Y-%m-%d"))
            pm2_5.append(row.pm2_5)
            pm10.append(row.pm10)
            so2.append(row.so2)
            no2.append(row.no2)
            co.append(row.co)
            o3.append(row.o3)
        a.append(time_1)
        a.append(pm2_5)
        a.append(pm10)
        a.append(so2)
        a.append(no2)
        a.append(co)
        a.append(o3)
        return jsonify(a)
    else:
        par = Year.query.filter(Year.cityname == privent)
        a = []
        time_1 = ['product']
        pm2_5 = ['pm2.5']
        pm10 = ['pm10']
        so2 = ['so2']
        no2 = ['no2']
        co = ['co']
        o3 = ['o3']
        for row in par:
            time_1.append(row.year)
            pm2_5.append(row.avg_pm2_5)
            pm10.append(row.avg_pm10)
            so2.append(row.avg_so2)
            no2.append(row.avg_no2)
            co.append(row.avg_co)
            o3.append(row.avg_o3)
        a.append(time_1)
        a.append(pm2_5)
        a.append(pm10)
        a.append(so2)
        a.append(no2)
        a.append(co)
        a.append(o3)
        return jsonify(a)


@app.route('/get_chinamap')
def get_map():
    with open('static/js/中华人民共和国.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data)


@app.route("/leida", methods=['GET'])
def get_leida():
    city = request.args.get('city')
    date = request.args.get('date')
    result = Data.query.filter_by(cityname=city).filter_by(time=date).first()
    print(result.cityname)
    data = {'pm2_5': result.pm2_5, 'pm10': result.pm10, 'so2': result.so2, 'no2': result.no2, 'co': result.co,
            'o3': result.o3}
    return jsonify(data)


@app.route("/avg_leida", methods=['GET'])
def avg_leida():
    city = request.args.get('city')
    result = Breath_avg.query.filter_by(cityname=city).first()
    data = {'pm2_5': result.pm2_5, 'pm10': result.pm10, 'so2': result.so2, 'no2': result.no2, 'co': result.co,
            'o3': result.o3}
    return jsonify(data)


@app.route("/aqi_fenbu", methods=['GET'])
def aqi_fenbu1():
    city = request.args.get('city')
    year = request.args.get('year')
    result = Aqi_fenbu.query.filter_by(cityname=city).filter_by(year=year).all()
    data_dict = []
    for i in result:
        data = {'cityname': i.cityname, 'year': i.year, 'month': i.month, 'day': i.day, 'aqi': i.aqi}
        data_dict.append(data)
    print(city, year)
    return jsonify(data_dict)


# 展示首页
@app.route('/')
@login_required
def sy():
    # session.pop('_flashes', None)  # 清除所有闪现的消息
    return render_template('index.html')


@app.route('/one_page')
def one_page():
    date = request.args.get('date')
    return render_template('sy.html', date=date)


# 定义展示第二个页面的路由
@app.route('/second_page')
def second_page():
    date = request.args.get('date')
    return render_template('index2.html', date=date)


# 定义展示第三个页面的路由
@app.route('/three_page')
def three_page():
    date = request.args.get('date')
    return render_template('按周月年查询.html', date=date)


# 定义展示第四个页面的路由
@app.route('/four_page')
def four_page():
    date = request.args.get('date')
    return render_template('按年.html', date=date)


@app.route('/dongtai', methods=['GET'])
def dt():
    result = []
    tmp_list = []
    current_time = None
    qury_data = Top10.query.all()
    for i in qury_data:
        if current_time != i.time:
            if tmp_list:
                tmp_list = []
            current_time = i.time

        tmp_list.append({
            'name': i.cityname,
            'value': i.aqi
        })

        if len(tmp_list) == 10:
            result.append({
                'time': current_time.strftime('%Y-%m-%d'),
                'data': tmp_list,
                'date': current_time.strftime('%Y-%m-%d')
            })
            tmp_list = []
            current_time = None

    return jsonify(result)


@app.route('/prodata', methods=['GET'])
def pro():
    # 首先拿到省份
    pro = request.args.get('pro')
    t_pro = ['重庆市', '上海市', '北京市', '天津市']
    # 根据省份来找下辖的各市县 找各区县地区码
    if pro not in t_pro:
        citylist = Location2.query.filter_by(Adm1_Name_ZH=pro).all()
        result = []
        for i in citylist:
            result.append({'city_name': i.Adm2_Name_ZH, 'xq': (
                requests.get(f"https://devapi.qweather.com/v7/air/now?location={i.Location_ID}&key={key}",
                             proxies={"http": None, "https": None})).json(),
                           'Lcode': i.Location_ID})
    # 四大直辖市处理方法不同
    else:
        citylist = Location.query.filter_by(Adm2_Name_ZH=pro).all()
        result = []
        for i in citylist:
            result.append({'city_name': ys[i.Location_Name_ZH], 'xq': (
                requests.get(f"https://devapi.qweather.com/v7/air/now?location={i.Location_ID}&key={key}",
                             proxies={"http": None, "https": None})).json(),
                           'Lcode': i.Location_ID})

    return result


@app.route('/jiesao', methods=['GET'])
def jiesao():
    privent = request.args.get('privent')
    result = Index2_jiesao.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'value': i.aqi, 'name': i.cityname}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts2', methods=['GET'])
def echarts2():
    privent = request.args.get('privent')
    result = Index2_echarts2.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'pm2_5': i.pm2_5, 'pm_10': i.pm_10, "so2": i.so2, 'no2': i.no2, 'co': i.co,
                'o3': i.o3}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts3', methods=['GET'])
def echarts3():
    privent = request.args.get('privent')
    result = Index2_echarts3.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'date': i.date, 'average_aqi': i.average_aqi}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts4', methods=['GET'])
def echarts4():
    privent = request.args.get('privent')
    result = Index2_echarts4.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'month': i.year_month, 'pm2_5': i.pm2_5, 'pm_10': i.pm10, "so2": i.so2,
                'no2': i.no2, 'co': i.co, 'o3': i.o3}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts5', methods=['GET'])
def echarts5():
    privent = request.args.get('privent')
    result = Index2_echarts5.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'cityname': i.cityname, 'good_air_days': i.good_air_days, 'pollution_days': i.pollution_days,
                'aqi': i.aqi}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts6', methods=['GET'])
def echarts6():
    privent = request.args.get('privent')
    result = Index2_echarts6.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'cityname': i.cityname, 'pm2_5': i.pm2_5, 'pm_10': i.pm10, "so2": i.so2,
                'no2': i.no2, 'co': i.co, 'o3': i.o3}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/echarts7', methods=['GET'])
def echarts7():
    privent = request.args.get('privent')
    result = Index2_echarts7.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'total': i.total, 'air_lv': i.air_lv}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb1', methods=['GET'])
def zb1():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'pm2_5': i.pm2_5}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb2', methods=['GET'])
def zb2():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'pm10': i.pm10}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb3', methods=['GET'])
def zb3():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'so2': i.so2}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb4', methods=['GET'])
def zb4():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'o3': i.o3}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb5', methods=['GET'])
def zb5():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'co': i.co}
        data_dict.append(data)
    return jsonify(data_dict)


@app.route('/zb6', methods=['GET'])
def zb6():
    privent = request.args.get('privent')
    result = Zb.query.filter_by(privent=privent).all()
    data_dict = []
    for i in result:
        data = {'privent': i.privent, 'no2': i.no2}
        data_dict.append(data)
    return jsonify(data_dict)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form.get('user')
        password = request.form.get('password')
        if not user or not password:
            flash('Invalid input.')
            return redirect(url_for('login'))
        user = User.query.filter_by(user=user).first()
        if user and user.password == password:
            login_user(user)
            flash('登录成功')
            if user.user == 'admin':
                session['is_admin'] = True
            else:
                session.pop('is_admin', None)
            return redirect(url_for('sy'))
        else:
            flash('登录失败')
            return redirect(url_for('login'))
    return render_template('login.html')


@app.route('/logout')
def logout():
    logout_user()
    flash('Goodbye.')
    return redirect(url_for('login'))


@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        username = request.form.get('user')
        password = request.form.get('password')
        if not username or not password:
            flash('Invalid input.')
            return redirect(url_for('register'))
        user = User.query.filter_by(user=username).first()
        if user:
            flash('用户已存在')
            return redirect(url_for('register'))
        else:
            cursor.execute(f"insert into student_test.user(user,password) values ('{username}','{password}')")
            conn.commit()
            flash('注册成功')
            return redirect(url_for('login'))
    return render_template('regist.html')


@app.route('/admin', methods=['GET', 'POST'])
def admin():
    result = []
    cursor.execute("select * from student_test.user")
    data = cursor.fetchall()
    for i in data:
        result.append({'id': i[0], 'user': i[1], 'password': i[2]})
    return jsonify(result)


@app.route('/admin1', methods=['GET', 'POST'])
def admin1():
    if not session.get('is_admin'):
        flash('你无权访问该页面')
        return redirect(url_for('sy'))
    return render_template('admin.html')


@app.route('/delete', methods=['GET', 'POST'])
def deleteuser():
    id = request.args.get('id')
    cursor.execute(f"delete from student_test.user where id = {id}")
    conn.commit()
    return redirect(url_for('admin1'))


@app.route('/dbcx_page')
def dbcx_page():
    date = request.args.get('date')
    return render_template('对比查询.html', date=date)


@app.route('/dbcx_page', methods=['GET', 'POST'])
def dbcx():
    if request.method == 'POST':
        # 从请求中获取数据
        data = request.get_json()

        # 读取城市代码文件
        with open('static/json/city1.json', 'rb') as f:
            cities = json.load(f)

        result = {}

        # 处理第一个城市信息
        if 'city1' in data:
            city1 = data['city1']
            city1_code = cities.get(city1)
            result1 = get_weather_data(city1_code)
            if result1:
                result['city1_data'] = result1
            else:
                result['error'] = '无法获取城市1数据'

        # 处理第二个城市信息
        if 'city2' in data:
            city2 = data['city2']
            city2_code = cities.get(city2)
            result2 = get_weather_data(city2_code)
            if result2:
                result['city2_data'] = result2
            else:
                # 如果已经有错误信息了，加一个新的键
                if 'error' in result:
                    result['error'] += '和无法获取城市2数据'
                else:
                    result['error'] = '无法获取城市2数据'

        # 如果有错误消息就返回错误，否则返回结果
        if 'error' in result:
            return jsonify(result)
        return jsonify(result)
    else:
        return render_template('对比查询.html')


def get_weather_data(city_code):
    if not city_code:
        return None
    # 替换为你的API URL
    url = f'https://devapi.qweather.com/v7/air/now?location={city_code}&key={key}'
    res = requests.get(url, proxies={"http": None, "https": None})
    if res.status_code == 200:
        data = res.json()
        # 检查返回的数据是否有错误
        if data['code'] == '200':
            # 直接从 'now' 键下提取数据
            weather_data = data['now']
            # 提取 aqi 和其他污染指标
            return {
                "category": weather_data['category'],
                'aqi': float(weather_data['aqi']),
                'pm10': float(weather_data['pm10']),
                'pm2.5': float(weather_data['pm2p5']),
                'no2': float(weather_data['no2']),
                'so2': float(weather_data['so2']),
                'co': float(weather_data['co']),
                'o3': float(weather_data['o3']),
            }
    else:
        return None


@app.route('/chat', methods=['POST', 'GET'])
def chat():
    print('Received /chat request')
    data1 = request.args.get('data1')
    data2 = request.args.get('data2')

    # 从字符串转换回JSON对象
    chat1 = json.loads(data1)
    chat2 = json.loads(data2)
    print(chat1)
    print(chat2)

    url = 'http://127.0.0.1:7077/v1/chat/completions'
    headers = {'Content-Type': 'application/json'}  # 设置请求头
    payload = {
        "channelId": "1236224487763083307",
        "messages": [
            {
                "content": f"{chat1}{chat2}",
                "role": "user"
            }
        ],
        "model": "gpt-4-turbo-128k",
        "stream": False
    }

    # 发送 POST 请求
    response = requests.post(url, headers=headers, data=json.dumps(payload))

    # 确保响应成功
    if response.status_code == 200:
        print(response.text.encode('GBK', 'ignore').decode('GBK'))
        # Response.json() 用于解析返回的JSON数据
        return jsonify(response.json())
    else:
        # 如果响应失败，返回错误信息
        return jsonify({"error": "Failed to fetch data from the API"}), response.status_code


if __name__ == '__main__':
    app.run()
