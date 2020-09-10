/**
 * This class is the master Role class.
 * 
 * Every Creep must extend this class. This is also the class that can be passed to various Mixins as the Superclass
 */

class Role {

    generateName(){
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var dt = new Date().getTime();
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
}

module.exports=Role;