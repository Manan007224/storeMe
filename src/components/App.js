import React, { Component } from 'react';
import {CreateCourse} from "./create-courses";
import {CourseList} from "./course-list";
import axios from 'axios';

class App extends Component {


  render() {
    return (
      <div className="jumbotron">
        <h1> Course Data Manager </h1>
        <CourseList/>
      </div>
    );
  }
}

export default App;	