const http=require('http');
const userDetails=[{id:1,name: 'Ridhi',password:'12345'},{id:1,name: 'Ridhi',password:'11111'},{id:2,name: 'Reema',password:'12'},{id:3,name: 'Rithvik',password:'123'},{id:4,name: 'Rahul',password:'1234'}];
const registerUser=(user)=>{
    var isUserAvailable=0;
    collectionCopy.findOne({id:user.id}, (err, item) => {
        if(item==null){
            isUserAvailable=0;
        }else{
        
            isUserAvailable=1;
        }
      })
  setTimeout(function(){
    if(isUserAvailable){
    console.log('User already registered');
    }else{
    
    collectionCopy.insertOne(user);
    console.log('Registered Successfully');
}},2000);
    
}

const loginUser=(user)=>{
    var isUserAvailable=0;
    collectionCopy.findOne({id:user.id,password:user.password}, (err, item) => {
        if(item==null){
            isUserAvailable=0;
        }else{
        
            isUserAvailable=1;
        }
      })
  setTimeout(function(){
    if(isUserAvailable){
    console.log('User loggedIn successfully');
    }else{
    console.log('User need to Register first');
}},2000);
    
}

let collectionCopy='';
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
const db = client.db('mydb');
let collection = db.collection('users');
collectionCopy=collection;
  console.log("connected to mongodb");
registerUser(userDetails[0]);
loginUser(userDetails[1]);
})


