import React from "React";
import axios from "axios";

export class FilesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }

        this.showFilesHandler = this.showFilesHandler.bind(this);
        // this.uploadFilesHandler = this.addFilesHandler.bind(this);
        // this.downloadFilesHandler = this.downloadFilesHandler.bind(this);
        // this.deleteFilesHandler = this.deleteFilesHandler.bind(this);

    }

    async showFilesHandler() {
        let to_r = {};
        let URL = 'http://localhost:8080/COURSES' + this.props.Course;
        await axios.get(URL).then(res => {
            if(res.data.err) {
                to_r = {error: res.data.err};
            }
            else {
                to_r = {classes: res.data.files}
            }
        }).catch(err =>{
            console.warn('AXIOS::GET_FILES::ERR', err);
        });
        return to_r;
    }

    componentWillMount() {
        let URL = 'http://localhost:8080/COURSES/' + this.props.Course;
        axios.get(URL).then((response) =>{
            this.setState({files: response.data.files})
            console.log(this.state);
        });
    }


    render() {
        return (
           <table>
               {this.state.files.map(file =>
                   <tr> {file} </tr>
               )}
            </table>
        );
    }

}