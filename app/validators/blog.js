const {
    Rule,
    LinValidator
} = require('@core/validate.js')
const { createValidate } = require('@core/util.js')


class BaseRules {
    constructor() {
        this.id = [
            new Rule("isInt", "分类ID需要正整数", { min: 1 })
        ]
        this.title = [
            new Rule("isLength", "文章标题不能为空"),
            new Rule("isLength", "分类名称长度1-80", { min: 1, max: 80 }),
        ]
        this.des = [
            new Rule("isLength", "文章描述不能为空"),
            new Rule("isLength", "分类名称长度1-100", { min: 1, max: 100 }),
        ]
        this.cover = [
            new Rule("isLength", "封面图片不能为空"),
        ]
        this.category = [
            new Rule("isLength", "所属分类不能为空")
        ]
        this.tag = [
            new Rule("isLength", "所属标签不能为空")
        ]
        this.content = [
            new Rule("isLength", "文章内容不能为空")
        ]
        this.status = [
            new Rule("isLength", "状态不能为空"),
            new Rule("isIn", "状态值不合适", [0, 1, 2]),
        ]
    }
}

class BlogValidator extends LinValidator {
    constructor(parmas) {
        super()
        let list = new BaseRules()
        createValidate.call(this, parmas, list)
    }
}





module.exports = {
    BlogValidator
}
