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

/**** Some test data ***
const questions = [
    {
        id: 0,
        title: "What’s your favorite genre of book or movie?",
        question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        answers: []},
    {id: 1, title: "Do you think that humans as a species have gotten better through the generations or worse? Why?", question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", answers: []},
    {id: 2, title: "What have you recently become obsessed with?", question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", answers: [
            {id: 1, text: "You how state classes but not in Functions", votes: 0},
            {id: 2, text: "See answer 1", votes: 0},]},
    {id: 3, title: "How has the education you received changed your life?", question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", answers: []},
];
 */
/**** Routes ****/

// Return all questions in data
app.get('/api/questions', (req, res) => res.json(questions));
app.get('/api/question/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);
    res.json(question);
});

app.get('/api/question/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);
    res.json(question.answers);
});

app.get('/api/question/:id/answer/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const aid = parseInt(req.params.aid);
    const question = questions.find(q => q.id === id);
    const answer = question.answers.find(a => a.id === aid);
    res.json(answer);
});

// Ask Question
app.post('/api/questions/', (req, res) => {
    const text = req.body.text;
    const desc = req.body.desc;
    questions.push({id: Math.floor(Math.random() * 101), title: text, question: desc, answers: []});
    console.log(text);
    res.json({msg: "Question added", question: text});
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
app.put('/api/question/:id/answer/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const aid = parseInt(req.params.aid);
    const question = questions.find(q => q.id === id);
    const answer = question.answers.find(a => a.id === aid);
    answer.votes++;
    console.log(answer);
    res.json({msg: "Answer updated", answer: answer});
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));