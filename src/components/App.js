import React, { Component } from 'react';
import {CreateCourse} from "./create-courses";
import {CourseList} from "./course-list";
import axios from 'axios';

const Courses = [
    {name: 'CMPT 379'},
    {name: 'CMPT 353'},
    {name: 'CMPT 276'}
];


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {Courses: Courses};
      // this.addCourses = this.addClassesHandler.bind(this);
      // this.showCourses = this.showClassesHandler.bind(this);
      // this.deleteCourses = this.deleteClassesHandler.bind(this);
  };


componentDidMount() {
  axios.get('http://localhost:8080/COURSES').then(res => {
    console.log(res);
  });
}


  render() {
    return (
      <div>
        <CreateCourse
          createCourse = {this.createCourse.bind(this)}
        />
        <CourseList
          Courses = {this.state.Courses}
        />
      </div>
    );
  }
  createCourse(cl) {
    this.state.Courses.push({name: cl});
    this.setState({Courses: this.state.Courses});
  }
}

export default App;	