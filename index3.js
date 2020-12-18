const Event=require('events');
class MyEvent extends Event{}
const myEvent=new Event();

myEvent.on('yellow',()=>{
    console.log("Yellow light lits up");
})

myEvent.on('green',()=>{
    console.log("Green light lits up");
})
myEvent.on('red',()=>{
    console.log("Red light lits up");
})

myEvent.emit('red');
myEvent.emit('yellow');
myEvent.emit('green');