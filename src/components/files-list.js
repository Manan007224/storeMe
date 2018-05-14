import React from "React";
import axios from "axios";
import {FilesCreate} from "./files-create"
import {FileItem} from "./files"

export class FilesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }

        this.showFilesHandler = this.showFilesHandler.bind(this);
        this.uploadFilesHandler = this.uploadFilesHandler.bind(this);
        this.downloadFilesHandler = this.downloadFilesHandler.bind(this);
        this.deleteFilesHandler = this.deleteFilesHandler.bind(this);

    }
    
    componentWillMount() {
        let URL = 'http://localhost:8080/COURSES/' + this.props.Course;
        axios.get(URL).then((response) =>{
            this.setState({files: response.data.files})
        });
    }
    

    async showFilesHandler(uri) {
        let to_r = {};
        let URL = 'http://localhost:8080/COURSES/' + uri;
        await axios.get(URL).then(res => {
            if(res.data.err) {
                to_r = {error: res.data.err};
            }
            else {
                to_r = {files: res.data.files}
            }
        }).catch(err =>{
            console.warn('AXIOS::GET_FILES::ERR', err);
        });
        return to_r;
    }

    async uploadFilesHandler(uri, fName) {
        try {
            let URL = 'http://localhost:8080/COURSES/' + uri;
            await axios.post(URL, {fileName: fName}).then(res => {
                if(res.data.err) {
                    console.warn(err);
                }
            }).catch(err =>{
                console.warn('AXIOS::ADD_COURSES::ERR', err);
            });
            let new_files = await this.showFilesHandler(uri);
            if(new_files.hasOwnProperty('error')) {
               console.warn('AXIOS::GET_COURSES::ERR', new_files.error);
            }
            else {
                this.setState({files: new_files.files});
            }
        }
        catch(err) {
            console.warn('creatClass::ERR', err);
        }
    }

    async downloadFilesHandler(fl, curr) {
        try {
            let URL = 'http://localhost:8080/COURSES/' + curr +'/' + fl;
            await axios.get(URL).then(res => {
                if(res.data.err) {
                    console.warn(err);
                }
            }).catch(err =>{
                console.warn('AXIOS::ADD_COURSES::ERR', err);
            });
        }
        catch(err) {
            console.warn('downloadFile::ERR', err);
        }
    }

    async deleteFilesHandler(fl, curr) {
        try {
            let URL = 'http://localhost:8080/COURSES/' + curr + '/deleteCourses';
            await axios.post(URL, {fileName: fl}).then((res) =>{
                if(res.data.err) {
                    console.warn(err);
                }
                console.log(res);
            }).catch((err) =>{
                console.warn('AXIOS::DELETE_COURSES::ERR', err);
            });
            let new_files = await this.showFilesHandler(curr);
            if(new_files.hasOwnProperty('error')) {
               console.warn('AXIOS::GET_COURSES::ERR', new_files.error);
            }
            else {
                this.setState({files: new_files.files});
            }
        }
        catch(err) {
            console.warn("deleteFile::ERR", err);
        }
    }

    render() {
        return (
           <table>
               <tr> <div> <FilesCreate uploadFile={this.uploadFilesHandler} current={this.props.Course} /> </div> </tr>
               <table>
                   <FileItem 
                        files={this.state.files} 
                        current={this.props.Course}
                        deleteFile={this.deleteFilesHandler}
                        downloadFile={this.downloadFilesHandler}
                    />
               </table>
            </table>
        );
    }
}