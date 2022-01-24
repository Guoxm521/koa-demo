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
async function exists(low_str, up_str) {
    let promise_list = pathList.map((e, index) => {
        return new Promise((resolve) => {
            fs.access(joinPath(e, index == 3 ? up_str : low_str), (err) => {
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
        throw new Error(`${ list.length }个文件夹已存在文件`)
    }

}

// 读取文件
async function readFile(up_str) {
    let file_list = ['apiTemp', 'daoTemp', 'validateTemp', 'modelTemp']
    let promise_list = file_list.map((e, index) => {
        return new Promise((resolve) => {
            let text = fs.readFileSync(`${ e }.js`).toString()
            if (index !== 0) {
                text = text.replace(/Temp/g, up_str)
            }
            resolve(text);
        })
    })

    return Promise.all(promise_list)
}

// 写入文件
async function writeFile(res, low_str, up_str) {
    res.map((e, index) => {
        try {
            fs.writeFileSync(joinPath(pathList[index], index == 3 ? up_str : low_str), e, 'utf8');
        } catch (err) {
            throw err;
        }
    })
}


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


inquirer.prompt(questions).then(async (answers) => {
    let low_str = answers.name // 小驼峰
    let up_str = replaceStr(answers.name) //大驼峰
    try {
        await exists(low_str, up_str)
        let list = await readFile(up_str)
        await writeFile(list, low_str, up_str)
        console.log('文件生成完成')
    } catch (error) {
        console.log(error)
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