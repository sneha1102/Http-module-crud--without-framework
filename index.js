const fs=require('fs');
const content="Hey there....!!!!";
fs.writeFile('myfile.txt',content,{flag:"w"},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("written successfully");
    }
})
fs.readFile('myfile.txt',function(err,content){
    if(err)
    throw err;
    console.log(content.toString());
    
})
const data=fs.readFileSync('mytext.txt');
console.log(data.toString());
const d="hello hey";
fs.writeFileSync('mytext.txt',d,{flag:"a"});
