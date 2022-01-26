const jwt = require("jsonwebtoken")
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

const createValidate = function (parmas, list) {
    if (parmas && parmas instanceof Array) {
        parmas.map(e => {
            this[e] = list[e]
        })
    } else {
        for (const item in list) {
            this[item] = list[item]
        }
    }
}

// 生成令牌
const generateToken = function () {
    console.log(2131312312312)
    let secretKey = global.config.security.secretKey
    let expiresIn = global.config.security.expiresIn
    let token = jwt.sign({ foo: 'bar' }, secretKey, { expiresIn: '120' });

    console.log(token)
    var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NDMyMDYzOTMsImV4cCI6MTY0MzIwNjM5M30.iXcADWTwq7kGw73giemLY-dn8xVJ-mvKX7GgWVP354Q', secretKey);
    console.log(decoded.foo) // bar
}

module.exports = {
    findMembers,
    createValidate,
    generateToken
}
