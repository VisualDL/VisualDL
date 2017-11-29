from setuptools import setup

packages = ['visualdl', 'visualdl.frontend.dist', 'visualdl.mock_data']

setup(
    name="visualdl",
    version="0.0.1",
    packages=packages,
    package_data={'visualdl.frontend.dist': ['fonts/*']},
    include_package_data=True,
    install_requires=['flask>=0.12.1'],
    url='http://www.baidu.com/',
    license='Apache 2.0')
