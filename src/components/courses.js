import React from "react";

export class CourseItem extends React.Component {

    render() {
       return (
            <div>
               {this.renderCourseSection()}
            </div>
       );
    }

    renderCourseSection() {
        let CourseStyle = {
            cursor: 'pointer'
        }
        return (
            <div>
                {this.props.Courses.map(Course => 
                <tr>
                    <td onClick={this.onToggleClass.bind(this, {Course})}>
                    {Course}
                    </td>
                    <td>
                        <button>Edit</button>
                        <button onClick={this.onDeleteClick.bind(this, {Course})}>Delete</button>
                    </td>
                </tr>
            )}
            </div>
        );
    }

    onDeleteClick(toDelete) {
        this.props.deleteClass(toDelete.Course);
    }

    onToggleClass(toggleClass) {
        this.props.toggleClass(toggleClass.Course);
    }
}