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

app.get('/api/question/:id/answers', async (req, res) => {
    const id = req.params.id;
    const question = await questionDB.getQuestion(id);
    res.json(question.answers);
});
// Ask Question
app.post('/api/questions/', async (req, res) => {
    let newQuestion = {
        title: req.body.title,
        question: req.body.question
    }
    console.log(newQuestion, "from app")
    await questionDB.postQuestion(newQuestion);
    res.json({msg: "Question posted", newQuestion});
});
// PostAnswer
app.post('/api/question/:id/answers', async (req, res) => {
    const id = req.params.id;
    const answer = req.body.answer
    await questionDB.postAnswer(id, answer);
    //const answer = {id: Math.floor(Math.random() * 101), text: text, votes: 0};
    //question.answers.push(answer);
    res.json({msg: "Answer added", answer});
});

//put
app.put('/api/question/:id/answer/:aid', async (req, res) => {
    const id = req.params.id;
    const aid = req.params.aid;
    //const question = questions.find(q => q.id === id);
    //const answer = question.answers.find(a => a.id === aid);
    //answer.votes++;
    await questionDB.voteAnswer(id, aid);
    res.json({msg: "Answer updated"});
});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);


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
 //ealier askQuestion
 const text = req.body.text;
 const desc = req.body.desc;
 questions.push({id: Math.floor(Math.random() * 101), title: text, question: desc, answers: []});
 console.log(text);
 res.json({msg: "Question added", question: text});

 //ealier postAnswer
 const id = req.params.id;
 const text = req.body.text;
 const question = questionDB.getQuestion(id);

 const answer = {id: Math.floor(Math.random() * 101), text: text, votes: 0};

 question.answers.push(answer);
 console.log(question);
 res.json({msg: "Answer added", question: question});

 */
/*
app.get('/api/question/:id/answer/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const aid = parseInt(req.params.aid);
    const question = questions.find(q => q.id === id);
    const answer = question.answers.find(a => a.id === aid);
    res.json(answer);
});*/