// https://www.jb51.net/article/118500.htm
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require("fs")
const path = require('path');
let basePath = path.resolve('../')
function joinPath(...parmas) {
    return path.join(basePath, ...parmas) + '.js'
}
console.log(joinPath('models', 'name'))

// 判断文件在不在
function exists(name) {
    let pathList = ['app/api', 'app/dao', 'app/validators', 'models']
    let promise_list = pathList.map(e => {
        return new Promise((resolve, reject) => {
            fs.access(joinPath(e, 'BlogAdmin'), (err) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    })
    return Promise.all(promise_list)
}

async function main1() {
    let res = await exists()
    console.log(res)
}
main1()
return
const questions = [
    {
        type: 'input',
        name: 'name',
        message: "请输入英文格式类名",
        validate(value) {
            const pass = value.match(
                /^[a-z][a-zA-Z]+$/
            );
            if (pass) {
                return true;
            }
            return '请输入你需要添加的类型名称';
        },
    }
];


inquirer.prompt(questions).then((answers) => {
    console.log(path)
    let low_str = answers.name // 小驼峰
    let up_str = replaceStr(answers.name) //大驼峰
    // 文件名
    let files_name = {
        api_name: low_str,
        dao_name: low_str,
        validate_name: low_str,
        modle_name: up_str
    }
}).catch(error => {
    console.log(error)
})


function replaceStr(str) {
    var reg = /\b(\w)|\s(\w)/g;
    return str.replace(reg, function (m) {
        return m.toUpperCase()
    });
}