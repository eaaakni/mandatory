/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const appName = "Mandatory"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.
app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../client/build')); // Needed for serving production build of React

/**** Database ****/
const questionDB = require('./qa_db')(mongoose);

/**** Routes ****/
// Return all questions in data
app.get('/api/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
});

app.get('/api/question/:id', async (req, res) => {
    let id = req.params.id;
   //const question = questions.find(q => q.id === id);
    const question = await questionDB.getQuestion(id);
    res.json(question);
});

app.get('/api/question/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);
    res.json(question.answers);
});
/*
app.get('/api/question/:id/answer/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const aid = parseInt(req.params.aid);
    const question = questions.find(q => q.id === id);
    const answer = question.answers.find(a => a.id === aid);
    res.json(answer);
});*/

// Ask Question
app.post('/api/questions/', async (req, res) => {
    let question = {
        title: req.body.title,
        desc: req.body.desc
    }
    const newQuestion = await questionDB(question);
    res.json(newQuestion);
    /*const text = req.body.text;
    const desc = req.body.desc;
    questions.push({id: Math.floor(Math.random() * 101), title: text, question: desc, answers: []});
    console.log(text);
    res.json({msg: "Question added", question: text});*/
});
// PostAnswer
app.post('/api/question/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const question = questions.find(q => q.id === id);

    const answer = {id: Math.floor(Math.random() * 101), text: text, votes: 0};

    question.answers.push(answer);
    console.log(question);
    res.json({msg: "Answer added", question: question});
});

//put
app.put('/api/question/:id/answer/:aid', async (req, res) => {
    const id = req.params.id;
    const aid = req.params.aid;
    //const question = questions.find(q => q.id === id);
    //const answer = question.answers.find(a => a.id === aid);
    //answer.votes++;

    await questionDB.voteAnswer(id, aid);

    //console.log(answer);
    res.json({msg: "Answer updated"});
});

/**** Start! ***
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));*/
const url = process.env.MONGO_URL || 'mongodb://localhost/qa_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await questionDB.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Question API running on port ${port}!`);
    })
    .catch(error => console.error(error));



/**** Some test data ***
 const questions = [
,
 ];
 */