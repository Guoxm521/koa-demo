const {
    Rule,
    LinValidator
} = require('@core/validate.js')

class CategoryValidator extends LinValidator {
    constructor() {
        super()
        this.name = [new Rule("isLength", "分类 name 名字不能为空", { min: 1 })]
    }
}



module.exports = {
    CategoryValidator
}
