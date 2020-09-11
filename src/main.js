let RoomController = require('room');

module.exports.loop = function() {

    if(!Memory.rooms){
        Memory.rooms = {};
    }
    _.forEach(Game.rooms, (room) => { 
        let controller = new RoomController(room);
        controller.Tick();
    });
}