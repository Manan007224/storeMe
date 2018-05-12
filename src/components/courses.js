import React from "react";

export class CourseItem extends React.Component {

    // componentWillMount() {
    //     console.log('Component COURSES Will Mount');
    //     console.log(this.props);
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log("Component will receive props", nextProps);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("Should Component update");
    //     console.log(this.props);
    //     console.log("The Next Props are", nextProps);
    //     console.log("The Next state of the Component is", nextState);
    //     // if (nextState.status === 1) {
    //     //     return false;
    //     // }
    //     return true;
    // }
    
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(this.props);
    //     console.log("Component will update", nextProps, nextState);
    // }

    // componentDidUpdate(prevProps, prevState) {
    // console.log("Component did update", prevProps, prevState);
    // }

    // componentWillUnmount() {
    // console.log("Component will unmount");
    // }

    render() {
       return (
            <tr>
                <td>
                    <ul>{this.props.Courses.map(Course => <li>{Course}</li>)}</ul>
                </td>
                <td>
                    <button> Edit </button>
                    <button> Delete </button>
                </td>
            </tr>
       );
    }
}