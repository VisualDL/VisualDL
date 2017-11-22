#!/bin/bash

echo '[prepare] start'

mkdir -p build-tools

cd build-tools

wget -r -nH --level=0 --cut-dirs=7 getprod@product.scm.baidu.com:/data/prod-64/baidu/third-party/nodejs/nodejs_6-10-0-1_PD_BL/  --user getprod --password getprod --preserve-permissions

cd output/
tar zxf nodejs.tar.gz
export PATH=`pwd`/bin:$PATH

cd ../../

# 使用 内部源 安装依赖包
node -v
npm -v

# use npm
npm install --registry=http://pnpm.baidu.com
npm install "@baidu/cms-follows" --registry=http://registry.npm.baidu.com

echo '[prepare] end'

echo '[build] start'

# release

#npm run release -- --app tup
npm run release -- --app mip --template mip


# result
if [ $? -ne 0 ]; then
    exit 1
fi

# output ${APPNAME} ||

# output
mv dist output

cd output
tar czf fe.tar.gz *

cd ..

mv output/fe.tar.gz .
rm -rf output/*

mv fe.tar.gz output/

# result
if [ $? -eq 0 ]; then
    echo '[build] done'
    exit 0
else
    echo '[build] fail'
    exit 1
fi
