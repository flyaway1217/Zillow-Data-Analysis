# !/usr/bin/env python3
# -*- coding:utf-8 -*-
#
# Author: Yichu Zhou - flyaway1217@gmail.com
# Blog: zhouyichu.com
#
# Python release: 3.6.0
#
# Date: 2017-11-29 20:36:33
# Last modified: 2017-11-29 20:51:37

"""
Extract all counties.
"""

import json

path = 'data.json'

# load the data
with open(path, encoding='utf8') as f:
    data = json.load(f)
    print(type(data))

counties = set()

for key in data:
    category = data[key]
    for item in category:
        county_name = item['CountyName']
        state = item['State']
        newkey = [county_name, state]
        newkey = ','.join(newkey)
        counties.add(newkey)

counties = list(counties)
print(counties)

with open('counties.json', 'w', encoding='utf8') as f:
    json.dump(counties, f)
