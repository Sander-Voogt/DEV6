/**
 * Created by andre on 16-3-2017.
 */
class Group{
    constructor(){
        this.f_id = f_id;
        this.name = name;
        this.members = members;
        this.money = money;
    }

    get F_id(){
        return this.f_id;
    }

    get Name(){
        return this.name;
    }

    get Members(){
        return this.members;
    }

    get Money(){
        return this.money;
    }
}

// var group = new Group(1, 'newgroup", 3, 1000)
// group.money(); -> return 1000