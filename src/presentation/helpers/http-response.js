const MissingParamError = require("./missing-param-error")

module.exports = class HttpResponse {
    static badrequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static serverError() {
        return {
            statusCode: 500
        }
    }
}