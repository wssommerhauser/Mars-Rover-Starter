const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// // NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// //       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


 describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts.", function() {
    let rover = new Rover(98382); 
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
    });

    it("response returned by receiveMessage contains the name of the message", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      expect(response.message).toBe('Test message with two commands');
    });

    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      expect(response.results.length).toBe(2);
    });

    it("responds correctly to the status check command", function() {
      let commands = [new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      //expect(response.results[0].roverStatus).toBe("{mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }"");
      expect(response.results[0].roverStatus).toEqual({mode: rover.mode, generatorWatts: rover.generatorWatts, position: rover.position });
     });

    it("responds correctly to the mode change command", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      expect(rover.mode).toBe("LOW_POWER");
    });

    it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1)];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toBe(false);
    });

    it("responds with the position for the move command", function() {
      let commands = [new Command('MOVE', 1234)];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382); 
      let response = rover.receiveMessage(message);
      //expect(rover.position).toBe(commands[0].value);
      expect(response.rover.positionn).toBe(commands[0].value);
    });

});
