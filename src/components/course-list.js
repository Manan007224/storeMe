import React from "react";
import _ from 'lodash';
import {CourseItem} from "./courses";

export class CourseList extends React.Component {
    passProps() {
        const props = this.props;
        return _.map(this.props.Courses, (Course, index) => <CourseItem key={index} {...Course} {...props}/>);
    }
    
    render() {
        return (
            <table>
                <div> Now Displaying the courses </div>
                <tbody> {this.passProps()} </tbody>
            </table>
        );
    }
}