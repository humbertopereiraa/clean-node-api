
const express = require('express');
const router = express.Router();


module.exports = () => {
    const adapt = new SignUpRouter();
    router.post('/signup', ExpressRouterAdapter.adapt(router));
}

class ExpressRouterAdapter {
    static adapt(router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = await router.route(httpRequest);
            res.status(httpResponse.statusCode).json(httpResponse.body);
        }
    }
}

//sinup-router
class SignUpRouter {
    async router(httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body;
        const user = new SignUpUseCase().signUP(email, password, repeatPassword);
        return {
            status: 200,
            body: user
        }
    }
}

// signup-usecase
class SignUpUseCase {
    async signUP(email, password, repeatPassword) {
        if (password === repeatPassword) {
            new AddAccountRepository().add(email, password);
        }
    }
}

//add-account-repo
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

class AddAccountRepository {
    async add(email, password) {
        const user = await AccountModel.create({ email, password });
        return user;
    }
}


