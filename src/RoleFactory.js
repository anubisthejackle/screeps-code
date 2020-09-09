let Harvester=require('class.Harvester');
let HarvesterHauler=require('class.HarvesterHauler');
let Hauler=require('class.Hauler');

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