let Upgrade = (superclass) => class extends superclass {

    get bodyBuild(){
        let body = super.bodyBuild();
        if(!body){
            body = [];
        }

        if(!body.includes(WORK)){
            body.push(WORK);
        }

        if(!body.includes(CARRY)){
            body.push(CARRY);
        }

        if(!body.includes(MOVE)){
            body.push(MOVE);
        }

        return body;
    }

}

module.exports=Upgrade;