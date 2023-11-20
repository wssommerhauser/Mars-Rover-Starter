class Rover {
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   //message parameter will be a Message object, created from the Message Class.
   receiveMessage(message){
      let object = {
         message: message.name,
         results: []
      };

      for (let i = 0; i < message.commands.length; i++){
         if (message.commands[i].commandType === "MOVE"){
            if(this.mode = "LOW_POWER"){
               object.results.push({completed: false});
            }else{
               object.results.push({completed: true});
               this.position = message.commands[i].value;
            }
         } 
         else if (message.commands[i].commandType === "STATUS_CHECK"){
            object.results.push({
               completed: true, 
               roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
            });
         } 
         else if (message.commands[i].commandType === "MODE_CHANGE"){
            object.results.push({completed: true});
            this.mode = message.commands[i].value;
       } 
      else{
          object.results.push({completed: false});
       }
      
   }
   return object;
}
}

module.exports = Rover;