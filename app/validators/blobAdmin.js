const {
    Rule,
    LinValidator
} = require('@core/validate.js')
const { createValidate } = require('@core/util.js')


class BaseRules {
    constructor() {
        this.email = [
            new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
        ]
        this.password = [
            new Rule('isLength', '密码至少6个字符，最多22个字符', {
                min: 6,
                max: 22
            }),
            new Rule(
                'matches',
                '密码长度必须在6~22位之间，包含字符、数字和 _ ',
                '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            )
        ]
        this.password1 = this.password2 = this.password
        this.nickname = [
            new Rule('isLength', '昵称长度必须在2~16之间', {
                min: 2,
                max: 16
            }),
        ]
    }
}

class AdminValidator extends LinValidator {
    constructor(parmas) {
        super()
        let list = new BaseRules()
        createValidate.call(this, parmas, list)
    }
}


module.exports = {
    AdminValidator
}
