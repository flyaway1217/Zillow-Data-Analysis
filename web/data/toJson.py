# !/usr/bin/env python3
# -*- coding:utf-8 -*-
#
# Author: Flyaway - flyaway1217@gmail.com
# Blog: zhouyichu.com
#
# Python release: 3.5.2
#
# Date: 2017-11-07 14:30:06
# Last modified: 2017-11-07 20:17:55

"""
Convert the data from csv into json.
"""

import csv
import os
import json


def collect(dirpaths):
    data = dict()
    for dirpath in dirpaths:
        names = os.listdir(dirpath)
        print(names)
        for name in names:
            path = os.path.join(dirpath, name)
            with open(path, encoding='utf8') as csvFile:
                read = csv.DictReader(csvFile)
                array = [line for line in read]
            data[name.replace('.csv', '')] = array
    return data


def write(data, path):
    with open(path, 'w', encoding='utf8') as f:
        json.dump(data, f)


if __name__ == '__main__':
    paths = ['rent', 'list_price']
    data = collect(paths)
    write(data, 'data.json')
