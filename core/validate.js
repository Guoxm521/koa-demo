const validator = require('validator')
const { ParameterException } = require('./httpException')

// 验证
class validatorMiddleWares {

}

class RuleResult {
    constructor(pass, msg = '') {
        Object.assign(this, {
            pass,
            msg
        })
    }
}

class Rule {
    constructor(name, msg, ...params) {
        Object.assign(this, {
            name,
            msg,
            params
        })
    }

    validate(field) {
        if (this.name == 'isOptional')
            return new RuleResult(true)
        if (!validator[this.name](field + '', ...this.params)) {
            return new RuleResult(false, this.msg || this.message || '参数错误')
        }
        return new RuleResult(true, '')
    }
}

module.exports = {
    Rule,
    LinValidator
}
