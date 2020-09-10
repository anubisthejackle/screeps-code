let Harvester=require('roles.Harvester');
let HarvesterHauler=require('roles.HarvesterHauler');
let Hauler=require('roles.Hauler');

class RoleFactory {

    static getRole(role){

        switch(role){
            case 'harvester':
                return new Harvester();
            case 'hauler':
                return new Hauler();
            case 'harvesterhauler':
                return new HarvesterHauler();
            default:
                return false;
        }

    }

}

module.exports=RoleFactory;