const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const employee = require('./models/lists')

const usersdata = require('./models/users')

const tasksdata = require('./models/tasks');

const teamsSchema = require('./models/task-management');

const teamTasksSchema = require('./models/team-task-schema')

const tasks = require('./models/tasks');

mongoose.connect('mongodb://localhost:27017/taskmanager', {useNewUrlParser : true, useUnifiedTopology : true}).then(()=> { console.log("MongoDB Connected");}).catch(()=> { console.log("error connecting");});

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS,DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())
                    

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/lists', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
    
    employee.find().then(data => res.status(200).json(data)).catch(err => {
        console.log('Error:${err}');
        res.status(500).json(err);})

});

app.get('/users', (req, res, next) => {    
    usersdata.find().then(data => res.status(200).json(data)).catch(err => {
        console.log('Error:${err}');
        res.status(500).json(err);})

});

app.get('/tasks', (req, res, next) => {    
    tasksdata.find().then(data => res.status(200).json(data)).catch(err => {
        console.log('Error:${err}');
        res.status(500).json(err);})

});

app.post('/users', (req, res, next) => {
    const emp =  new usersdata({
        UserName : req.body.UserName, 
        Email : req.body.Email,
    });
    emp.save().then(()=>{console.log("Success")}).catch(err=>{console.log("Error:"+ err);});
});

app.post('/tasks', (req, res, next) => {
    const emp =  new tasksdata({
        taskname : req.body.taskname, 
        taskdesc : req.body.taskdesc,
        taskpriority : req.body.taskpriority,
        tasksstatus : req.body.tasksstatus,
    });
    emp.save().then(()=>{console.log("Success")}).catch(err=>{console.log("Error:"+ err);});
});

//serve incoming post requests to /students
app.post('/lists', (req, res, next) => {
    const emp =  new employee({
        list_name : req.body.list_name, 
        list_desc : req.body.list_desc,
        list_priority : req.body.list_priority
    });
    emp.save().then(()=>{console.log("Success")}).catch(err=>{console.log("Error:"+ err);});
});

app.delete("/lists/:id", (req, res, next) => {
    employee.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.delete("/users/:id", (req, res, next) => {
    usersdata.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.delete("/tasks/:id", (req, res, next) => {
    tasksdata.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/lists/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        employee.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                list_name : req.body.list_name, 
            list_desc : req.body.list_dec,
         list_priority : req.body.list_priority
            }}, 
            {new:true} 
        ) 
        .then((emp) => { 
            if (emp) { //what was updated 
                console.log(emp); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.put('/users/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        usersdata.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                UserName : req.body.UserName, 
            Email : req.body.Email,
            }}, 
            {new:true} 
        ) 
        .then((emp) => { 
            if (emp) { //what was updated 
                console.log(emp); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});


app.put('/tasks/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        tasksdata.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                taskname : req.body.taskname, 
                taskdesc : req.body.taskdesc,
                taskpriority : req.body.taskpriority,
                tasksstatus : req.body.tasksstatus,
            }}, 
            {new:true} 
        ) 
        .then((emp) => { 
            if (emp) { //what was updated 
                console.log(emp); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.get('/lists/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    employee.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.get('/users/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    usersdata.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

app.get('/tasks/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    tasksdata.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


app.get('/taskmanagement/teams', (req, res, next) => {
    teamsSchema.find()
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
 })
});

app.post('/taskmanagement/teams', (req, res, next) => {
    console.log("creating new team "+req.body.name);
    const newform = new teamsSchema({
        name: req.body.name,
        email: req.body.email,
        description:req.body.description,
        users:req.body.users,
    });
    //send the document to the database 
    newform.save()
        //in case of success
        .then((response) => { console.log('Success');
        res.status(200).json(response);
    })
        //if error
        .catch(err => {console.log('Error:' + err);
        //res.status(500).json(err);
        res.status(500).send(err+"")
        //next(err)
    });
});

app.delete("/taskmanagement/teams/:id", (req, res, next) => {
    console.log("called delete")
    teamsSchema.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.get("/taskmanagement/teams/:name", (req, res, next) => { 
    teamsSchema.findById({ name: req.params.name }).then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
 })
});



app.put('/taskmanagement/teams/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    console.log("body: " + req.body) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        teamsSchema.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{
                name: req.body.name,
                email: req.body.email,
                description:req.body.description,
                users:req.body.users,
    
            }}, 
            {new:true} 
        ) 
        .then((teams) => { 
            if (teams) { //what was updated 
                console.log(teams); 
                res.status(200).json("updated!");
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});
                    

app.get('/taskmanagement/teamtasks', (req, res, next) => {
    console.log("called team tasks")
    teamTasksSchema.find()
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
 })
});



app.post('/taskmanagement/teamtasks', (req, res, next) => {
    console.log("creating new team "+req.body.name);
    const newform = new teamTasksSchema({
        name: req.body.name,
        priority: req.body.priority,
        description:req.body.description,
        teamName:req.body.teamName,
        state:req.body.state,
        dueDate:req.body.dueDate
    });
    //send the document to the database 
    newform.save()
        //in case of success
        .then((response) => { console.log('Success');
        res.status(200).json(response);
    })
        //if error
        .catch(err => {console.log('Error:' + err);
        //res.status(500).json(err);
        res.status(500).send(err+"")
        //next(err)
    });
});

app.delete("/taskmanagement/teamtasks/:id", (req, res, next) => {
    console.log("called delete")
    teamTasksSchema.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.get("/taskmanagement/teamtasks/:name", (req, res, next) => { 
    teamTasksSchema.findById({ name: req.params.name }).then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
 })
});

app.get("/taskmanagement/teamtasks/:teamname", (req, res, next) => { 
    teamTasksSchema.find({ teamname: req.params.teamname }).then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
 })
});


app.put('/taskmanagement/teamtasks/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    console.log("body: " + req.body) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        teamTasksSchema.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{
                name: req.body.name,
                priority: req.body.priority,
                description:req.body.description,
                teamName:req.body.teamName,
                state:req.body.state,
                dueDate:req.body.dueDate
    
            }}, 
            {new:true} 
        ) 
        .then((teams) => { 
            if (teams) { //what was updated 
                console.log(teams); 
                res.status(200).json("updated!");
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.get('/taskmanagement/teamnames', (req, res, next) => {
    console.log("called team names")
    teamsSchema.find({},{_id:0,name:1})
    .then(data => {
        let a = [];
        console.log(data)
        data.map(element => a.push(element.name))
        console.log("called team names");
        res.status(200).json(a)})
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}'+err);
    res.status(500).json(err);
 })
});
//to use this middleware in other parts of the application
module.exports=app;