'use strict';
const fs = require('fs');
const request_promise = require('request-promise');
require('isomorphic-fetch');
const request = require('request');
const http = require('http');
const cors = require('cors');
const crypto = require('crypto');
const Dropbox = require('dropbox').Dropbox;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbx = new Dropbox({accessToken: process.env.ACCESS_TOKEN});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const router = express.Router();

// MiddleWare function add acess Cross control origin

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
  

// Adding all the basic routes here for the Basic COURSE WEB-PAGE

app.get('/createCourses', async function(req, res, next){
	try {
		args = {path: '/'};
		await dbx.filesCreateFolderV2(args);
		res.status(200).json('Succesfully Created the File');

	}
	catch(err) {
		res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
	}
});

// Adding the routes for File Operations for a Particular Course
// Check if the given 'id' entity is either a file, folder, media file, tar file or a zip file.


// Adding the routes to Upload a certain file for the given id

app.post('/COURSES/:id', async function(req, res, next) {
	try {
		let _courseID = req.params.id;
		let to_upload = req.body.fileName;
		let uplaod_path = '/COURSES/' + _courseID + '/' + to_upload;
		let content = fs.readFileSync(to_upload);
		let args = {contents: content, path: uplaod_path, autorename: true, mute: false };
		await dbx.filesUpload(args)
			.then((response) => {
				console.log('SUCCESS');
				res.status(200).json({result: 'File Upload Operation Completed Succesfully'});
			})
			.catch((err) => {
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		console.log(err);
		res.status(409).json({error: 'This course with this id doesn\'t belong'});
	}
});

// Route - Add a new course to the MAIN COURSE folder
// WorAround - None

app.post('/COURSES', async function(req, res, next) {
	try {
		let to_upload = req.body.fileName;
		let upload_path = '/COURSES/' + to_upload;
		console.log(upload_path);
		await dbx.filesCreateFolderV2({path: upload_path})
			.then((response) => {
				res.status(200).json({result: 'File Upload Operation Completed Succesfully'});
			})
			.catch((err) => {
				console.log(err);
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		console.log(err);
		res.status(409).json({error: 'This course with this id doesn\'t exitst'});
	}
});

// Route - Delete an existing course from the MAIN COURSE folder
// WorkAround - None

app.post('/deleteCourse', async function(req, res, next){
	try {
		let to_delete = req.body.fileName;
		let delete_path = '/COURSES/' + to_delete;
		await dbx.filesDeleteV2({path: delete_path})
			.then((response) => {
				console.log(response);
				res.status(200).json({result: 'File Delete Operation Completed Succesfully'});
			})
			.catch((err) => {
				console.log(err);
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		res.status(409).json({error: 'This course with this id doesn\'t exist'});
	}
});

// Route - Show all the COURSES in the COURSE folder
// WorkAround - Add some more error handling

app.get('/COURSES', async function(req, res, next) {
	try {
		let args = {path: '/COURSES', recursive: false, include_deleted: false, limit: 100};
		let all_files = [];
		await dbx.filesListFolder(args)
			.then((response) => {
				response.entries.forEach((file) => {
					all_files.push(file.name);
				});
				console.log('REACHED HERE');
				let metadata = {files: all_files};
				res.json(metadata);
				//res.end(metadata);
			})
			.catch((err) => {
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		console.log(err);
		res.status(409).json({error: 'This course with this id doesn\'t exitst'});
	}
});

// Route - Upload a file in a particular COURSE folder
// WorkAround - In the future see if recursive param in the args needs to be set true.

app.get('/COURSES/:id', async function(req, res, next) {
	try {
		let pth = '/COURSES/' + req.params.id;
		let args = {path: pth, recursive: false, include_deleted: false, limit: 100};
		let all_files = [];
		await dbx.filesListFolder(args)
			.then((response) => {
				response.entries.forEach((file) => {
					all_files.push(file.name);
				});
				let metadata = {files: all_files};
				console.log(metadata);
				res.status(200).json(metadata);
			})
			.catch((err) => {
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		console.log(err);
		res.status(409).json({error: 'This course with this id doesn\'t exitst'});
	}
});

// Route - Upload a file(or a Folder) from a particular Course
// WorkAround - Add a function(getFileMetadata) to check if the file is a zip then filesZipUploadV2 will be performed

// app.post('/COURSES/:id', async function(req, res, next) {
// 	try {
// 		console.log("REACHED THIS ROUTE");
// 		let _id = req.params.id;
// 		let to_upload = req.body.fileName;
// 		let upload_path = '/COURSES/' + _id + '/' + to_upload;
// 		await dbx.filesCreateFolderV2({path: upload_path})
// 			.then((response) => {
// 				res.status(200).json({result: 'File Upload Operation Completed Succesfully'});
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
// 			});
// 	}
// 	catch(err) {
// 		console.log("REACHED THIS ROUTET");
// 		console.log(err);
// 		res.status(409).json({error: 'This course with this id doesn\'t exitst'});
// 	}
// });

// Route - Delete a file(or a Folder) from a particular Course
// WorkAround - Add a function(getFileMetadata) to check if the file is a zip then filesZipDeleteV2 will be performed

app.post('/COURSES/:id/deleteCourses', async function(req, res, next){
	try {
		let _id = req.params.id;
		let to_delete = req.body.fileName;
		let delete_path = '/COURSES/' + _id + '/' + to_delete;
		await dbx.filesDeleteV2({path: delete_path})
			.then((response) => {
				console.log(response);
				res.status(200).json({result: 'File Delete Operation Completed Succesfully'});
			})
			.catch((err) => {
				res.status(err.status).json({error: {summary: err.error.error_summary, statusText: err.response.statusText}});
			});
	}
	catch(err) {
		console.log(err);
		res.status(409).json({error: 'This course with this id doesn\'t exitst'});
	}
});

// Route to download a course from a particular course FOLDER
// WorkAround - Add a option for ZIP and TAR files, but later

app.get('/COURSES/:id/:if', async function(req, res, next) {
	try {
		let to_download = '/COURSES/' + req.params.id + '/' + req.params.if;
		let bytes = " ";
		await dbx.filesDownload({path: to_download})
			.then((response) => {
				bytes = response.fileBinary;
				fs.writeFile("test.txt", bytes, "binary", (err) => {
					if(err) res.status(409).json({err: 'Problem related to uploading the file'});
					else {
						res.status(200).json({result: "Success in Downloading the File"});
					}
				});
			})
			.catch((err) =>{
				res.status(409).json({err: 'Problem with dbx download file function'});
			});
	}
	catch(err) {
		console.log(err);
	}
})


const port = process.env.PORT || 8080;
app.listen(port);
console.log('The server is listening on port 8080');


