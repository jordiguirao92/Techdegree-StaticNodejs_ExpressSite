const express = require('express');
const app = express(); 

const path = require('path');

//Extracting the data from the json file. 
const data = require('./data.json');
const projects = data.projects;


//Setting the view engine
app.set('view engine', 'pug');


//Static files in the public folder.
//app.use('/static', express.static('public')); //We can load the data in the public folder using the acces /static. 
//app.use('/static', express.static('public'));
//Getting the absolute path of the directory.
app.use('/static', express.static(path.join(__dirname, 'public')));



//GET
//Setting "index" route. 
app.get('/', (req, res) => { 
    res.render("index.pug", {projects});
  });

//Setting "about" route. 
app.get('/about', (req, res) => { 
    res.render("about.pug");
  });

  //Setting "project" route. 
app.get('/projects/:id', (req, res, next) => { 
  if (req.params.id >= 0 && req.params.id < projects.length){
    const id = req.params.id; //Acces to the reques parameters.
    const project = projects[id]; //Setting the project id
    res.render("project.pug", {project}); //Passing the parameter "locals" project to the project.pug file. 
  } else {
    const err = new Error('Sorry, page not found');
    err.status = 404;
    next(err); //Calling to middleware error handling function
  }
   
});

  //ERROR:
  app.use((req, res, next) => {
      const err = new Error("Sorry, page not found");
      err.status = 404;
      next(err); //Calling to middleware error handling function
  });
  //Error handling middelware. Runs if a user navigates to a non-existing route.
  app.use((err, req, res, next) => {
      res.locals.error = err;
      res.status(err.status);
      console.log(`${err}; Status: ${err.status}`);
      res.render("error.pug");
      
  });


  //Starting server in port 3000. node app.js. Stop server ctrl+C
app.listen(3000, () => {
  console.log("Tha app is running in the localhost:3000");
});
