import React from "react";
import axios from "axios";
export class CreateCourse extends React.Component {
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="Add a new Course Here" ref="createClass" />
                <button> Create </button>
            </form>  
        );
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.props.createClass(this.refs.createClass.value);
    }
}