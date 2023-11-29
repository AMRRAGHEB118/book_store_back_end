class ApiError extends Error {
    constructor(status_code, message) {
        super(message)
        this.status_code = status_code
        this.status = `${status_code}`.startsWith(4) ? 'fail' : 'error'
        this.is_operational = true
    }
}

module.exports = ApiError