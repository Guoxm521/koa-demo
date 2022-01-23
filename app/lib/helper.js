class Resolve {
    json(data = {}, message = 'success', code = 200) {
        return {
            code,
            message,
            data
        }
    }
    fail(data = {}, message = 'fail', code = 10001) {
        return {
            code,
            message,
            data
        }
    }
}

module.exports = Resolve