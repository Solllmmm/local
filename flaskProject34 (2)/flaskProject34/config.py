
user = 'root'
password = '15213564963Zy'
database = 'student_test'
host = 'rm-cn-x0r3ngn3l00096do.rwlb.rds.aliyuncs.com'
port = '3306'


SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8".format(user, password, host, port,database)
# host='localhost'
# port=10000
# database='data'
# # 设置sqlalchemy自动更跟踪数据库
# SQLALCHEMY_DATABASE_URI = 'hive://192.168.56.101:10000/data'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY='grdsgfrsgrfs'
# 查询时会显示原始SQL语句
SQLALCHEMY_ECHO = False

# 禁止自动提交数据处理
SQLALCHEMY_COMMIT_ON_TEARDOWN = False