const {
    Rule,
    LinValidator
} = require('@core/validate.js')
const { createValidate } = require('@core/util.js')


class BaseRules {
    constructor() {

    }
}

class TempValidator extends LinValidator {
    constructor() {
        super()
        let list = new BaseRules()
        createValidate.call(this, parmas, list)
    }
}





module.exports = {
    TempValidator
}
