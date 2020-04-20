import React, {Component} from 'react';

export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      question: "",
      comments: []
    }
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onSubmit() {
    this.props.postQuestion(this.state.title, this.state.question, this.state.comments)
  }

  render(){
    return (
        <>
        <h1>Ask Question</h1>
          <input name="title" aria-label="title" type="text" placeholder="Write a title"
                 onChange={event => this.onChange(event)}/>
          <input name="question" aria-label="question" type="text" placeholder="Write a Question"
                 onChange={event => this.onChange(event)}/>
          <button onClick={_ => this.onSubmit()}>Ask Question</button>

        </>
    );
  }
}


