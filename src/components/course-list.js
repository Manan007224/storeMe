import React from "react";
import _ from 'lodash';
import axios from 'axios';
import {CourseItem} from "./courses";
import {CreateCourse} from "./create-courses";

export class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {Courses: []};
    }

    componentWillMount() {
        axios.get('http://localhost:8080/COURSES').then(res => {
            console.log(res.data.files);
            this.setState({Courses: res.data.files});
        });
    }
    
    render() {
        return (
            <table>
                <div> Now Displaying the courses </div>
                <div> Create Class Mechanism </div>
                <CreateCourse createClass={this.createClass.bind(this)}/>
                <CourseItem Courses={this.state.Courses} />
            </table>
        );
    }

    async createClass(cl) {
        try {
            console.log('REACHED THIS FUNCTION');
            await axios.post('http://localhost:8080/COURSES', {fileName: cl}).then(res => {
                if(res.data.err) {
                    console.warn(err);
                }
            }).catch(err =>{
                console.warn('ADD_COURSES::ERR', err);
            });
            let new_class = [];
            await axios.get('http://localhost:8080/COURSES').then(res => {
               if(res.data.err) {
                   console.warn(err);
               }
               else new_class = res.data.files;
            }).catch(err =>{
                console.warn('GET_COURSES::ERR', err);
            });
            this.setState({Courses: new_class});
        }
        catch(err) {
            console.warn('creatClass:ERR', err);
        }
    }
}