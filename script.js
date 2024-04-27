const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")



app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(express.static(path.join("__dirname","public")))

app.get("/",(req,res)=>{
   
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    })
  
})

app.post("/create",(req,res)=>{

    fs.writeFile(`./files/${req.body.filename.split(' ').join(' ')}.txt`, req.body.name ,(err)=>{
        res.redirect("/")
    
    })
    
  
})


app.get("/files/:filename",(req,res)=>{
   
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,files)=>{
        res.render("show",{files:req.params.filename,name:files})
    })
  
})

app.get("/edit/:filename",(req,res)=>{
   
    
        res.render("edit",{previous:req.params.filename})

  
})

app.post("/edit",(req,res)=>{
   
  fs.rename(`./files/${req.body.previousesfile}`,`./files/${req.body.previousename}`,(err) =>{
    res.redirect("/")
  })


})


app.listen(3000)