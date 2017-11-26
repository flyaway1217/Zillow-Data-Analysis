# !/usr/bin/env python3
# -*- coding:utf-8 -*-
#
# Author: Yichu Zhou - flyaway1217@gmail.com
# Blog: zhouyichu.com
#
# Python release: 3.6.0
#
# Date: 2017-11-25 21:43:04
# Last modified: 2017-11-25 21:59:29

"""
Combine all the map data.
"""

import json
import os


allMap = dict()

names = os.listdir('states/')


def read(path, name):
    with open(path, encoding='utf8') as f:
        m = json.load(f)
        allMap[name] = m


for name in names:
    if name.endswith('.json'):
        print(name)
        path = os.path.join('states', name)
        read(path, name)

path = 'map/us_states.json'
read(path, 'usa')

with open('map.json', 'w', encoding='utf8') as f:
    json.dump(allMap, f)
