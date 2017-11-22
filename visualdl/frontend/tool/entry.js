/**
 * @file 入口配置生成
 */

const path = require('path');
const projectPath = path.resolve(__dirname, '..');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 默认 apps
 *
 * @type {Array}
 */
let defaultApps = [
    {
        name: 'index',
        feRoot: '/dist'
    }
];

/**
 * 获取 入口 js
 *
 * @param  {Array} apps  appname
 * @return {string}      file path
 */
function getModules(apps) {

    let modules = {};
    apps.forEach(function (item) {
        let app = item.name;
        modules[app] = path.join(projectPath, 'src/' + app + '.js');
    });

    return modules;
}

/**
 * 获取 HtmlWebpackPlugin
 *
 * @param  {string} app appname
 * @param  {boolan} template 是否使用默认模板
 * @return {HtmlWebpackPlugin}     HtmlWebpackPlugin
 */
function getTemplate(app, template) {
    let templateUrl = 'template/index.html';
    if (template) {
        templateUrl = `ejs-render-loader!template/${template}.ejs`;
    }
    return new HtmlWebpackPlugin({
        filename: app + '.html',
        template: templateUrl
    });
}

/**
 * 获取入口配置
 *
 * @param  {string} app appname
 * @param  {boolan} template 是否使用默认模板
 * @return {Object}     config
 */
function getEntry(app, template) {

    let buildApps = defaultApps.filter(function (item) {
        let name = item.name;
        return name === app;
    });

    buildApps = buildApps.length > 0 ? buildApps : defaultApps;

    return {
        module: getModules(buildApps),
        template: buildApps.map(item => getTemplate(item.name, template))
    };
}


module.exports.get = getEntry;
module.exports.entry = defaultApps;
