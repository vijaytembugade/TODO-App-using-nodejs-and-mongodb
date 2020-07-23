const express = require('express')
const http = require('http')
const mongoose = require('mongoose');
const ToDo = require('./models/todo');
const url =
  "mongodb+srv://bryleen:bryleen@first.qut0s.mongodb.net/todo_list?retryWrites=true&w=majority";
 const app = express();

 mongoose
   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => console.log("Connected to db"))
   .catch((err) => console.log(err));

// Set up view engine 
app.set("view engine", "ejs");

//Express urlencoded middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req,res,next) =>{
    res.render('index')
    //console.log(req.body.name)
})
app.get("/all-task", function (req, res) {
  ToDo.find().sort({ createdAt: -1 })
  .then((result) =>{
    res.render('all-task',{todo : result});
  })
    .catch((err) => console.log(err))
});

app.post("/response", (req, res) => {

  const todo = new ToDo(req.body);
  todo
    .save()
    .then((result) => {
      res.render('submitted',{todo : result});
    })
    .catch((err) => console.log(err));
    res.redirect('/all-task')
});

app.delete("/all-task/:id" , (res,req)=>{
  const id = req.params.id
  console.log(id)
  ToDo.findByIdAndDelete(id)
  .then((result)=>{
    res.json({redirect:'/all-task'})
    console.log(result)
  }).catch((err)=> console.log(err))

})





app.listen(1000, () => console.log("Connect at PORT : 1000"));