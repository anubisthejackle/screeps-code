let HarvesterHauler=require('roles.HarvesterHauler');

Creep.prototype.getRole = function(){
    let roleType = this.memory.role;

    switch(roleType){
        case "harvesterHauler":
            return new HarvesterHauler(this);
    }

    return null;
}