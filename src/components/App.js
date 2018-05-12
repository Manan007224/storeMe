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
  // constructor(props) {
  //     super(props);
  //     this.state = {Courses: []};
  // };


  // componentWillMount() {
  //   console.log();
  //   this.setState({Courses: this.addClassesHandler()});
  // }

  // addClassesHandler() {
  //   axios.get('http://localhost:8080/COURSES').then(res =>{
  //     console.log('REACHED HERE');
  //     console.log(res.data.files);
  //     return res.data.files;
  //   });
  // }

  render() {
    return (
      <div>
        <CourseList/>
      </div>
    );
  }
}

export default App;	