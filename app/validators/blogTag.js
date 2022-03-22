const {
    Rule,
    LinValidator
} = require('@core/validate.js')
const { createValidate } = require('@core/util.js')


class BaseRules {
    constructor() {
        this.id = [
            new Rule("isInt", "tag标签ID需要正整数", { min: 1 })
        ]
        this.name = [
            new Rule("isLength", "标签名称不能为空"),
            new Rule("isLength", "分类名称长度1-20", { min: 1, max: 20 }),
        ]
        this.status = [
            new Rule("isLength", "状态不能为空"),
            new Rule("isIn", "状态值不合适", [2, 1]),
        ]
    }
}

class BlogTagValidator extends LinValidator {
    constructor(parmas) {
        super()
        let list = new BaseRules()
        createValidate.call(this, parmas, list)
    }
}



module.exports = {
    BlogTagValidator
}
