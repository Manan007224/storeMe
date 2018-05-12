import React from "react";

export class CreateCourse extends React.Component {
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="Add a new Course Here" ref="createClass" />
                <button> Create </button>
            </form>  
        );
    }

    handleSubmit(event) {
        event.preventDefault();;
        this.props.createCourse(this.refs.createClass.value);
    }

}
