const {
    Rule,
    LinValidator
} = require('@core/validate.js')


class Base {
    constructor() {
        this.id = [
            new Rule("isInt", "分类ID需要正整数", { min: 1 })
        ]
        this.name = [
            new Rule("isLength", "分类名称不能为空"),
            new Rule("isLength", "分类名称长度1-20", { min: 1, max: 20 }),
        ]
        this.status = [
            new Rule("isLength", "状态不能为空"),
            new Rule("isInt", "分类ID需要正整数", { min: 1, }),
        ]
        this.sort_order = [
            new Rule("isLength", "排序不能为空"),
            new Rule("isInt", "排序order需要正整数", { min: 1, }),
        ]
    }
}

class CategoryValidator extends LinValidator {
    constructor() {
        super()
        this.name = [
            new Rule("isLength", "分类名称不能为空"),
            new Rule("isLength", "分类名称长度1-20", { min: 1, max: 20 })
        ]
    }
}

class DelCategoryValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt", "分类ID需要正整数", { min: 1 })
        ]
    }
}


class PostCategoryValidator extends LinValidator {
    constructor(parmas) {
        super()
        let list = new Base()
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
}




module.exports = {
    CategoryValidator,
    PostCategoryValidator,
    DelCategoryValidator
}
