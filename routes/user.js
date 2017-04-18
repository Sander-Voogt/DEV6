function User(id, name, money){
    this.id = id;
    this.name = name;
    this.money = money;
}

User.prototype.getid = function () {
    return this.id;
};

User.prototype.getname = function () {
    return this.name;
};

User.prototype.getmoney = function () {
    return this.money;
};

module.exports = User;