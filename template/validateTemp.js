const {
    Rule,
    LinValidator
} = require('@core/validate.js')


class BaseRules {
    constructor() {

    }
}

class TempValidator extends LinValidator {
    constructor() {
        super()
        let list = new BaseRules()
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
    TempValidator
}
