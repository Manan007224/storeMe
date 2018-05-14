import React from "React";

export class FileItem extends React.Component {

    deleteFile(toDelete, curr_class) {
        this.props.deleteFile(toDelete.file, curr_class);
    }

    downloadFile(toDownload, curr_class) {
        this.props.downloadFile(toDownload.file, curr_class);
    }


    render() {
        return (
            <table>
                {this.props.files.map(file => 
                <tr>
                    <td>{file}</td>
                    <td>
                        <button onClick={this.downloadFile.bind(this, {file}, this.props.current)}>Download</button>
                        <button onClick={this.deleteFile.bind(this, {file}, this.props.current)}>Delete</button>
                    </td>
                </tr>
            )}
            </table>
        );
    }
}




