# import os
# import json
import requests
# # 定义一个函数，用于读取单个json文件
# def read_json_file(json_file_path):
#     with open(json_file_path, 'r', encoding='utf-8') as json_file:
#         data = json.load(json_file)
#     return data
#
# # 定义你的目录路径
# dir_path = 'C:\\Users\\Administrator\\Desktop\\flaskProject34\\flaskProject34\\static\\data'
#
# # os.listdir() 方法用于返回指定的文件夹包含的文件或文件夹的名字的列表
# files = os.listdir(dir_path)
# files.remove('data-1461584707906-r1hSmtsx.json')
# print(files)
# # 遍历所有文件
# for file in files:
#     # 检查文件是否为json文件
#     if file.endswith('.json'):
#         # 构造完整的文件路径
#         file_path = os.path.join(dir_path, file)
#         # 读取json文件
#         data = read_json_file(file_path)
#         # 你可以在此处理读取到的数据
#         for i in data["features"]:
#             print(i["properties"]["name"])

# 设置源数据和目标数据

# with open('source.txt',encoding='utf-8')as f:
#     source=f.read().split('\n')
#
# with open('taget.txt',encoding='utf-8')as f:
#     target=f.read().split('\n')
#
# # 构建映射关系字典
# mapping_dict = {}
#
#
# for i in source:
#     # 提取前两个字
#     key = i[:2]
#     # 在源数据中搜索匹配项
#     for j in target:
#         if j.startswith(key):
#             mapping_dict[j] = i
#             break
#
# print(mapping_dict)
# print(len(mapping_dict))

print((requests.get('https://devapi.qweather.com/v7/air/now?location=101041300&key=5c9152e310b8429190c351c1afb36611')).json())