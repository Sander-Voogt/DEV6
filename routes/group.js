/**
 * Created by andre on 16-3-2017.
 */

// CLASS GROUP

function Group(f_id, name, members, money){
        this.f_id = f_id;
        this.name = name;
        this.members = members;
        this.money = money;
    }

    Group.prototype.getf_id = function () {
    return this.f_id;
    };

    Group.prototype.getname = function () {
        return this.name;
    };

    Group.prototype.getmembers = function () {
        return this.members;
    };

    Group.prototype.getmoney = function () {
        return this.money;
    };

module.exports = Group;