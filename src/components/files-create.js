import React from "React";
import _ from "lodash";
import axios from "axios";

export class FilesCreate extends React.Component {


   render() {
       return (
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input className="form-control" placeholder="Add a course Here" id="addFile" />
                    <button type="submit" className="btn btn-default"> Upload </button> 
                </div>
            </form>
       );
   } 

   handleSubmit(event) {
       event.preventDefault();
       let URI = this.props.current;
       this.props.uploadFile(URI, document.getElementById('addFile').value);
   }
}