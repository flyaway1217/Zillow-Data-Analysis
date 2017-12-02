# !/usr/bin/env python3
# -*- coding:utf-8 -*-
#
# Author: Yichu Zhou - flyaway1217@gmail.com
# Blog: zhouyichu.com
#
# Python release: 3.6.0
#
# Date: 2017-12-02 13:34:59
# Last modified: 2017-12-02 15:36:15

"""
Remove unused data
"""

import json


def read(path):
    with open(path, encoding='utf8') as f:
        m = json.load(f)
    return m

# data = read('data.json')
# newdata = dict()
# for name in data:
#     if 'RentPrice' not in name:
#         print(name)
#         newdata[name] = data[name]
#     if 'RentPrice_AllHomes' in name:
#         print(name)
#         newdata[name] = data[name]


data = read('map.json')
print(data['Alabama']['features'][0]['geometry']['coordinates'][0][0])


for state in data:
    if state in ['usa', 'key']:
        continue
    for county in data[state]['features']:
        geometry = county['geometry']['coordinates']
        for geo in geometry:
            try:
                for coord in geo:
                    coord[0] = round(coord[0], 2)
                    coord[1] = round(coord[1], 2)
            except TypeError:
                for coord in geo[0]:
                    coord[0] = round(coord[0], 2)
                    coord[1] = round(coord[1], 2)

print(data['Alabama']['features'][0]['geometry']['coordinates'][0][0])

with open('newmap.json', 'w', encoding='utf8') as f:
    json.dump(data, f)
