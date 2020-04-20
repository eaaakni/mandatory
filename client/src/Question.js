import React, {Component} from 'react';
import PostAnswer from "./PostAnswer";
import {Link} from "@reach/router";

export default class Question extends Component {

   onSubmit(aid) {
       this.props.voteAnswer(this.props.id, aid)
   }



    render(){
    const id = this.props.id;
    const question = this.props.getQuestion(id);

    let content = "Loading";
    let title = "Loading"
    let answers = [];
    if (question) {
        title =  question.title;
        content = question.question;
        answers = question.answers.map(a =>
            <li>{a.text}
                <button onClick={_ => this.onSubmit(a._id)}>Like: {a.votes}</button>
            </li>);
    }

    return (
        <>
            <h1>{title}</h1>
            <p>{content}</p>
            <ul>
            {answers}
            </ul>

            <PostAnswer id={id} postAnswer={(id, text) => this.props.postAnswer(id, text)}/>

        </>
    );

  }
}


/*
  constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        }
    }

  const mapFunction = (answer) => <div class="answer">{answer}</div>
  let answers = question.answers.map(mapFunction);

  submit(answer){
        this.setState({
            answer: answer
        }, () => {
            this.props.submitAnswer(this.state.answer, this.state.id)
        });
    }

<PostAnswer submit={(id, text) => this.submit(id, text)} onClick={_ => this.clicked()}></PostAnswer>



render(){
 <h2>{question.title}</h2>
            <p>{question.question}</p>
}
*/