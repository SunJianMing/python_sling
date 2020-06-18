'''
@Author: sjm
@Date: 2020-06-18 16:40:15
@LastEditors: sjm
@LastEditTime: 2020-06-18 17:08:22
@FilePath: /my_silder/setup.py
'''
import json
import os
from setuptools import setup


with open('package.json') as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")
URL = 'https://github.com/SunJianMing/python_sling'
setup(
    name=package_name,
    version=package["version"],
    author=package['author'],
    packages=[package_name],
    include_package_data=True,
    license=package['license'],
    description=package.get('description', package_name),
    install_requires=[],
    url=URL,
    classifiers = [
        'Framework :: Dash',
    ],    
)
