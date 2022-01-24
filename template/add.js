// https://www.jb51.net/article/118500.htm
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require("fs")
const path = require('path');
let basePath = path.resolve('../')
function joinPath(...parmas) {
    return path.join(basePath, ...parmas) + '.js'
}
let pathList = ['app/api', 'app/dao', 'app/validators', 'models']

// 判断文件在不在
async function exists(name) {
    let promise_list = pathList.map(e => {
        return new Promise((resolve) => {
            fs.access(joinPath(e, 'BlobAdmin'), (err) => {
                if (err) {
                    resolve({
                        item: e,
                        flag: false
                    })
                } else {
                    resolve({
                        item: e,
                        flag: true
                    })
                }
            })
        })
    })
    let res = await Promise.all(promise_list)
    let list = res.filter(e => {
        if (e.flag) {
            return e
        }
    })
    if (list && list.length > 0) {
        throw new Error(`${list.length}个文件夹已存在文件`)
    }

}

// 读取文件
async function readFile(name) {
    let file_list = ['apiTemp.js', 'daoTemp.js', 'modelTemp.js', 'validateTemp.js']
    let promise_list = file_list.map((e, index) => {
        return new Promise((resolve) => {
            let text = fs.readFileSync(e).toString()
            if (index !== 0) {
                text = text.replace(/Temp/g, name)
            }
            resolve(text);
        })
    })
}

// 写入文件
async function writeFile() {
    
}

async function main() {
    try {
        await readFile('Ceshi')
        // await exists()

    } catch (error) {
        console.log(error)
    }

}
main()
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