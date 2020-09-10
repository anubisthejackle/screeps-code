let RoomController = require('room');

module.exports.loop = function() {
    _.forEach(Game.rooms, (room) => { 
        let controller = new RoomController(room);
        controller.Tick();
    });
}