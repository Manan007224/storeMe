import React from "react";
import axios from "axios";
export class CreateCourse extends React.Component {

    render() {
        return (

            <form class="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div class="form-group">
                    <input class="form-control" placeholder="Add a course Here" ref="createClass"/>
                    <button type="submit" class="btn btn-default"> Create </button> 
                </div>
            </form>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addClass(this.refs.createClass.value);
    }
}

