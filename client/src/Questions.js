import React, {Component} from 'react';
import {Link} from "@reach/router";

export default class Questions extends Component {
  render(){
    let questions = this.props.data;
    console.log("questions", questions);
    const mapFunction = (elm) => <Link to={"/question/"+elm._id}><li key={elm._id}>{elm.title}</li></Link>;
    let list = questions.map(mapFunction);

    return (
        <>
        <h1>Questions</h1>
          <ul>
            {list}
          </ul>

        </>
    );
  }
}


