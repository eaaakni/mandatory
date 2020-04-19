import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import Questions from "./Questions";
import AskQuestion from "./AskQuestion";
import Question from "./Question";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const url = "http://localhost:8080/api/questions";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            questions: data
        })
    }

    getQuestion(id){
        const question = this.state.questions.find(q => q.id === parseInt(id));
        return question;
    }



    async postQuestion(title, desc){
        console.log("postQuestion", title, desc)
        const url = `http://localhost:8080/api/questions`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: title,
                desc: desc
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData();
    }


    async postAnswer(id, text){
        console.log("postAnswer", id, text)
        const url = `http://localhost:8080/api/question/${id}/answers`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData();
    }

   async voteAnswer(id, aid) {
        console.log("voteAnswer", id, aid);
        const url = `http://localhost:8080/api/question/${id}/answer/${aid}`;

       const response = await fetch(url, {
           headers: {
               'Content-Type': 'application/json'
           },
           method: 'PUT'
       });
       const data = await response.json();
       console.log("Printing the response:", data);
       this.getData();
    }

    render(){
      return (
          <>
              <nav>
                  <ul>
                      <Link to="/"><li>Home</li></Link>
                      <Link to="/ask"><li>Ask a question</li></Link>
                  </ul>
              </nav>
              <Router>
                  <Questions path="/" data={this.state.questions}></Questions>
                  <Question path="/question/:id"
                            getQuestion={id => this.getQuestion(id)}
                            postAnswer={(id, text) => this.postAnswer(id, text)}
                            voteAnswer={(id, aid) => this.voteAnswer(id, aid)}
                  >

                  </Question>
                  <AskQuestion path="/ask" postQuestion={(title, desc, answers) => this.postQuestion(title, desc, answers)}></AskQuestion>
              </Router>
          </>
    );
  }
}

/*
getQuestion(id){
        const findFunction = question => question.id === parseInt(id);
        return this.state.questions.find(findFunction);
    }


*submit(title, desc, answers) {
        let last = this.state.questions[this.state.questions.length -1]
        const newQuestion = {
            id: last.id + 1,
            title: title,
            question: desc,
            answers: answers
        }
        this.setState(
            {
                questions: [...this.state.questions, newQuestion]
            }
        )
    }


    submitAnswer(answer, id){
        console.log(answer, id)
        let state = this.state.questions
        let element = state.find(x=>x.id === parseInt(id))
        element.answers.unshift(answer);
        console.log(element)
    }
*
*
*
*
*
* */
