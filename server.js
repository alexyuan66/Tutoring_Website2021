//Student name: Alexander Yuan
//Code is modified from course example: L14_Express_(JavaScript)-EXAMPLES.zip

const express = require('express'); //Web framework for backed web development
const cors = require('cors');
const app = express();
app.use(cors());
const repo = require('./repository');
const repo2 = require('./repository2');
const repo3 = require('./repository3');
const repo4 = require('./repository4');

// This packages lets us use json format to send/receive messages
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

//This package lets us use some methods to handle filesystem paths
const path = require('path');

//This line configures express in order to use all the files in the public
//folder as the files that compose the web page
app.use(express.static('public'));

//GET request handler for the resource 'root' '/'
// No data from the user is used to handle the request
app.get('/', function (req, res) {
    //console.log("bbb");
    res.sendFile(__dirname + '/' + 'index.html');
});

//GET request handler for the resource lect14-example2
// No data from the user is used to handle the request
app.get('/StudentRegister', function (req, res) {
    //console.log("aaa");
    const filePath = './StudentRegister.html';
    const resolvedPath = path.resolve(filePath);
    res.sendFile(resolvedPath);
});

//GET request handler for the resource process
// This handler uses data entered by the user
app.get('/process1', function (req, res) {
    // Prepare output in JSON format
    const response = {
        student_username: req.query.studentusername_get,
        student_password: req.query.studentpass_get,
        student_call_option: req.query.studentcall_get,
        student_agree: req.query.studentagree_get,
        message: 'Hello there!!'
    };
    //console.log(response);
    res.json(JSON.stringify(response));
});
//Used for displaying JSON data in table format on a webpage
app.get('/getjson', async (req, res) => {
    var record = await repo3.getAllRecords();
    res.send(JSON.stringify(record));
})
//Used for displaying JSON data in table format on a webpage
app.get('/getjson2', async (req, res) => {
    var record = await repo4.getAllRecords();
    res.send(JSON.stringify(record));
})

//Used for saving registered student within a database
app.get('/studentsignup', async (req, res) => {
    const username = req.query.studentusername_get
    const password = req.query.studentpass_get
    const call = req.query.studentcall_get
    const type = req.query.persontype_get
    //console.log(tutorType)
  
    const addedRecord = await 
        repo.create({ type, username, password , call })
  
    //console.log(addedRecord)
  
    res.redirect('http://localhost:8081/PostRegister.html');

})

//Used for searching student login authentication
//Searchs database for username and password
app.get('/studentsignin', async (req, res) => {
    const inputUsername = req.query.studentusernameinput_get
    const inputPass = req.query.studentpassinput_get
    const inputType = req.query.typeinput_get
    const call = ""
    //console.log(inputUsername)
    var record = await repo.search( {inputType, inputUsername, inputPass , call})
    //console.log(record)
    if (record)
        //res.render('PostStudent.html');
        res.redirect('http://localhost:8081/PostStudent.html');
    else 
        res.redirect('http://localhost:8081/index1.html');
})

//Used for saving a registered tutor to the database
app.get('/tutorsignup', async (req, res) => {
    const tutorUsername = req.query.tutorusername_get
    const tutorPassword = req.query.tutorpass_get
    const tutorCall = req.query.tutorcall_get
    const tutorAreas = req.query.tutorareas_get
    const tutorType = req.query.tutortype_get
    //console.log(tutorType)
  
    const addedRecord = await 
        repo2.createTutor({ tutorType, tutorUsername, tutorPassword , tutorCall , tutorAreas})
  
    //console.log(addedRecord)
  
    res.redirect('http://localhost:8081/PostRegister.html');

})

//Used for searching tutor login authentication
//Searchs database for username and password
app.get('/tutorsignin', async (req, res) => {
    const inputTutorUsername = req.query.tutorusernameinput_get
    const inputTutorPass = req.query.tutorpassinput_get
    const inputTutorType = req.query.tutortypeinput_get
    const tutorCall = ""
    const tutorAreas = ""
    //console.log(inputTutorUsername)
    var recordTutor = await repo2.searchTutor( {inputTutorType, inputTutorUsername, inputTutorPass , tutorCall , tutorAreas})
    //console.log(recordTutor)
    if (recordTutor) 
    res.redirect('http://localhost:8081/PostTutor.html');
    else 
       res.redirect('http://localhost:8081/index1.html');
})

//Used for saving student tutoring requests in database
//Will be used when displaying JSON data in table format
app.get('/poststudent', async (req, res) => {
    const Name = req.query.postStudentName_get
    const Email = req.query.postStudentEmail_get
    const Subject = req.query.postStudentSubject_get
    const Tutor = req.query.postStudentTutor_get
    //console.log(tutorType)
  
    const addedRecord = await 
        repo3.createPostStudent({ Name, Email, Subject , Tutor })
  
    //console.log(addedRecord)
  
    res.redirect('http://localhost:8081/SuccessfulStudent.html');

})

//Used for saving tutor availbility in database
//Will be used when displayin JSON data in table format
app.get('/posttutor', async (req, res) => {
    const Name = req.query.postTutorName_get
    const Email = req.query.postTutorEmail_get
    const Subject = req.query.postTutorSubject_get
    const Contact = req.query.postTutorCall_get
    //console.log(tutorType)
  
    const addedRecord = await 
        repo4.createPostTutor({ Name, Email, Subject , Contact })
  
    //console.log(addedRecord)
    res.redirect('http://localhost:8081/SuccessfulTutor.html');
  

})

// Source code to start the server
const port = 8081;
const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});