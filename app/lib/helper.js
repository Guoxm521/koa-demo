class Resolve {
    json(data = {}, message = 'success', code = 200) {
        return {
            code,
            message,
            data
        }
    }
}

module.exports = Resolve