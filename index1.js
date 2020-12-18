const http=require('http');

async function bodyParser(request) {
    return new Promise((resolve, reject) => {
      let totalChunk = ""
      request.on("error", err => {
          console.error(err)
          reject()
        }).on("data", chunk => {
          totalChunk += chunk 
        }).on("end", () => {
          request.body = JSON.parse(totalChunk) 
          resolve()
        })
    })
  }
  function responseMessage(response,res){
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(res);
    response.end()
  }

  function errorMessage(response){
    //response.writeHead(400, { "Content-type": "text/plain" })
    response.writeHead(400, { "Content-Type": "application/json" })
    response.write("Invalid data")
    response.end()
  }

async function isUserRegistered(id,password){
  return  collectionCopy.findOne({userid:id,password:password})
}

async function isUserExist(id){
return collectionCopy.findOne({userid:id});
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
})

  async function registerUser(request, response) {
    try {
      await bodyParser(request)
      let str='';
      const ans = await isUserExist(request.body.userid)
        if(ans){
            str='User already registered';
            }else{
            collectionCopy.insertOne(request.body);
            str='Registered Successfully';
            }
     responseMessage(response,str)
 } catch (err) {
     errorMessage(response)
    }
  }


  async function loginUser(request, response) {
    try {
      await bodyParser(request)
      const ans = await isUserRegistered(request.body.userid,request.body.password)
      let str='';
        if(ans){
            str='User loggedIn successfully'
            }else{
            str='User need to Register first';
            }
      responseMessage(response,str)
 } catch (err) {
      errorMessage(response)
    }
  }


  async function findAllAvaliableUser(request, response) {
    try {
      await bodyParser(request)
      let res='';
    const usrname= await collectionCopy.find({},{projection:{name:1}}).toArray();
  
        if(usrname){
          res=JSON.stringify(usrname)
        }else{
          res='No user available'
        }
        responseMessage(response,res)
 } catch (err) {
      errorMessage(response)
    }
  }
 async function findUserById(request, response) {
    try {
     await bodyParser(request)
      let res='';
     const users= await collectionCopy.findOne({userid:Number(request.url.split("/")[3])},{projection:{name:1}})//, (err, item) => {
       
       if(users){
        res=JSON.stringify( users)
      }else{               
        res='no user available'
      }
      responseMessage(response,res)
      
 } catch (err) {
      errorMessage(response)
    }
  }

  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)


  async function findUserByAge(request, response) {
    try {
      await bodyParser(request)
      let res='';
      let resArr=[];
      let ans=0,birthDate,usrName='';
      let givenAge=Number(request.url.split("/")[3])

      const usrDetails=await collectionCopy.find({},{projection:{DOB:1,name:1}}).toArray();
      usrDetails.forEach((element) => {
        birthDate=element.DOB
        usrName=element.name
        ans=getAge(birthDate)
        if(ans>=givenAge){
          resArr.push([usrName,ans])
        }
        });

          if(resArr.length){
            res=JSON.stringify(resArr)
            
          }else{
            res='no user available'
          }
          responseMessage(response,res)
    
 } catch (err) {
      errorMessage(response)
    }
  }


  async function updateUserName(request, response) {
    try {
      await bodyParser(request)
       let res='';
      const users= await collectionCopy.findOne({userid:Number(request.url.split("/")[4])},{projection:{name:1}})
        const newValue={$set:{name:request.body.name}};
        
        if(users){
         let userDetails=JSON.stringify( users)
         collectionCopy.updateOne({userid:Number(request.url.split("/")[4])},newValue);
         res='Updated Name'
       }else{               
         res='no user available'
       }
       responseMessage(response,res)
       
  } catch (err) {
      errorMessage(response)
     }
  }

  async function updateUserDOB(request, response) {
    try {
      await bodyParser(request)
       let res='';
      const users= await collectionCopy.findOne({userid:Number(request.url.split("/")[4])},{projection:{DOB:1}})
        const newValue={$set:{DOB:request.body.DOB}};
        
        if(users){
         //let userDetails=JSON.stringify( users)
         collectionCopy.updateOne({userid:Number(request.url.split("/")[4])},newValue);
         res='Updated DOB'
       }else{               
         res='no user available'
       }
       responseMessage(response,res)
       
  } catch (err) {
    errorMessage(response)
     }
  }

  async function updateUser(request, response) {
    try {
      await bodyParser(request)
       let res='';
       let usrId=Number(request.url.split("/")[3])
      const users= await collectionCopy.findOne({userid:usrId},{projection:{DOB:1,name:1}})
        const newValue={$set:{DOB:request.body.DOB,name:request.body.name,password:request.body.password}};
        
        if(users){
        // let userDetails=JSON.stringify( users)
         collectionCopy.updateOne({userid:Number(request.url.split("/")[3])},newValue);
         res='Updated User'
       }else{              
         collectionCopy.insertOne({userid:usrId,name:request.body.name,DOB:request.body.DOB,password:request.body.password}) 
         res='User doesnot exist, so created new user'
       }
       responseMessage(response,res)
       
  } catch (err) {
      errorMessage(response)
     }
  }



const server=http.createServer((req,res)=>{
    let url=req.url;
    let method=req.method;
    let expID=/\/users\/id\/([0-9]+)/
    let expAge=/\/users\/age\/([1-9]+)/
    let expUpdateName=/\/users\/update\/name\/([0-9]+)/
    let expUpdateDOB=/\/users\/update\/dob\/([0-9]+)/
    let expUpdate=/\/users\/update\/([0-9]+)/
switch(method){
    case "POST": 
      if(url==='/register'){
        registerUser(req,res);
      }else if(url==='/login'){
        loginUser(req,res)
      }
      break;
    case "GET":
      if(url==='/users'){
        findAllAvaliableUser(req,res);
      }else if(url.match(expID)){
        findUserById(req,res); 
      }else if(url.match(expAge)){
      
        findUserByAge(req,res)
      }
      break;
    case "PATCH":
        if(url.match(expUpdateName)){
          updateUserName(req,res)
        }else if(url.match(expUpdateDOB)){
          updateUserDOB(req,res)
        }
      break;
    case "PUT":
        if(url.match(expUpdate)){
          updateUser(req,res)
      }
      break;
}
});
server.listen(3000,()=>console.log('Listening')); 