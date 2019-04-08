"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another != undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "leandro@gmail.com": new User('leandro@gmail.com', 'Leandro', 'leandro@!'),
    "sabrina@gmail.com": new User('sabrina@gmail.com', 'Sabrina', 'sabrina@!'),
    "lara@gmail.com": new User('lara@gmail.com', 'Lara', 'lara@!')
};
