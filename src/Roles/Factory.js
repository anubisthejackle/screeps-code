let Harvester = require('./Harvester');

class Factory {

    run(creep) {

        let role = this.generateRole(creep);

        if(!role){
            return;
        }

        role.run();        

    }

    generateRole(creep) {

        if(creep.memory.role == 'harvester'){
            return new Harvester(creep);
        }

        return false;

    }

}

module.exports = Factory;