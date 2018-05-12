import React from "react";

export class CourseItem extends React.Component {

    render() {
       return (
            <div>
                {this.props.Courses.map(Course => 
                    <tr>
                        <td>{Course}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                )}
            </div>
       );
    }
}