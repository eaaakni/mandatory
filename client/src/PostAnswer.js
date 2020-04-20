import React, {Component} from 'react';


export default class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.postAnswer(this.props.id, this.state.answer);
    }


    render(){
    return (
        <>
            <h3>Answers</h3>
            <input autoComplete="off" name="answer" onChange={event => this.onChange(event)} type="text"/>
            <button onClick={_ => this.onSubmit()}>Answer</button>
        </>
    );
  }
}


/*onSubmit() {
        this.props.submit(this.state.answer, this.state.id);
    }*/