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

    async showClassesHandler() {
        let to_r = {};
        await axios.get('http://localhost:8080/COURSES').then(res => {
            if(res.data.err) {
                to_r = {error: res.data.err};
            }
            else {
                to_r = {classes: res.data.files}
            }
        }).catch(err =>{
            console.warn('AXIOS::GET_COURSES::ERR', err);
        });
        return to_r;
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
                <CreateCourse deleteClass={this.deleteClass.bind(this)}/>
                <CourseItem Courses={this.state.Courses} />
            </table>
        );
    }

    async createClass(cl) {
        try {
            await axios.post('http://localhost:8080/COURSES', {fileName: cl}).then(res => {
                if(res.data.err) {
                    console.warn(err);
                }
            }).catch(err =>{
                console.warn('AXIOS::ADD_COURSES::ERR', err);
            });
            let new_class = await this.showClassesHandler();
            if(new_class.hasOwnProperty('error')) {
               console.warn('AXIOS::GET_COURSES::ERR', new_class.error);
            }
            else {
                this.setState({Courses: new_class.classes});
            }
        }
        catch(err) {
            console.warn('creatClass::ERR', err);
        }
    }

    async deleteClass(cd) {
        try {
            await axios.post('http://localhost:8080/deleteCourse', {fileName: cd}).then(res => {
            }).catch(err => {
                console.warn('AXIOS::DELETE_COURSES:ERR', err);
            });
            let new_class = await this.showClassesHandler();
            if(new_class.hasOwnProperty('error')) {
               console.warn('AXIOS::DELETE_COURSES::ERR', new_class.error);
            }
            else {
                this.setState({Courses: new_class.classes});
            }
        }
        catch(err) {
            console.warn('deleteTask::ERR', err);
        }
    }
}