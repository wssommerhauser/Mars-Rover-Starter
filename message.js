class Message {
   // Write code here!
   constructor(name, commands){
      this.name = name;
      if (!name) {
         throw Error("Message input required.");
       }
      this.commands = commands;
   }
}

module.exports = Message;