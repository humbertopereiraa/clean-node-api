const HttpResponse = require("../helpers/http-response");

module.exports = class LoginRouter {

    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    }

    route(httpRequest) {
        if (!httpRequest || !httpRequest.body) {
            return HttpResponse.serverError();
        }
        const { email, password } = httpRequest.body
        if (!email) {
            return HttpResponse.badrequest('email');
        }

        if (!password) {
            return HttpResponse.badrequest('password');
        }

        this.authUseCase.auth(email, password);
    }
}