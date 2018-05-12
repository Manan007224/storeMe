import React from "react";
import _ from 'lodash';
import axios from 'axios';
import {CourseItem} from "./courses";

export class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {Courses: []};
    }

    componentWillMount() {
        console.log('Compoents for COURSE-LIST WILL MOUNT NOW');
        axios.get('http://localhost:8080/COURSES').then(res => {
            console.log(res.data.files);
            this.setState({Courses: res.data.files});
        });
    }

    showCourseHandler() {
        axios.get('http://localhost:8080/COURSES').then(res => {
            console.log(res.data.files);
            return res.data.files;
        });
    }

    passProps() {
       
    }
    
    render() {
        return (
            <table>
                <div> Now Displaying the courses </div>
                <CourseItem Courses={this.state.Courses} />
            </table>
        );
    }
}