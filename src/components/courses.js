import React from "react";

export class CourseItem extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log("Component COURSES will receive props");
        console.log('The props in the courses list are', nextProps);
      }
    // constructor(props) {
    //     super(props);
    //     this.state = {editing: false};
    // }


    render() {
       return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <button> Edit </button>
                    <button> Delete </button>
                </td>
            </tr>
       );
    }
}