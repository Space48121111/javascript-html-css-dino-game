// import * as fs from 'fs';
// import http from './http';


const http = require('http');
// file stream
const fs = require('fs').promises;


// function getAllUsers() {
// 	var data = []
//
// 	fs.readFile(__dirname + "/users.json")
// 		.then(contents => {
// 			// parse json file back into an object in js
// 			data = JSON.parse(contents);
// 			console.log(data);
// 			// return data;
// 		})
//
// 	// for (var idx=0; idx<data.length; idx++) {
// 	// 	console.log(data[idx].userName);
// 	// }
// 	console.log('all '+data);
// 	return data;
// }
// getAllUsers();

var data = []

function loadData() {
	fs.readFile(__dirname + "/users.json")
		.then(contents => {
		data = JSON.parse(contents);
	});
}
// asynchronously pre-processed the data to return true or false beforehand
loadData();

function CreateUsername(userName, password) {
	// fs.readFile(__dirname + "/users.json")
	// 	.then(contents => {
	// 	var	data = JSON.parse(contents);
		// var data = getAllUsers();
		for (var i=0; i<data.length; i++) {
			if (data[i].userName == userName) {
				return false;
			}
			console.log('Try to match '+data[i].userName+' with '+userName);
		};

		var obj = {
			userName: userName,
			password: password
		}
		data.push(obj);
		console.log(data.length);
		fs.writeFile('users.json', JSON.stringify(data), function(err) {
			if (err) throw err;
			// return true;
		});
	// })

	return true;
}

function CkUsername(userName, password) {

		for (var i=0; i<data.length; i++) {
			if (data[i].userName == userName && data[i].password == password) {
				return true;
			}
			console.log('Try to match '+data[i].userName+' with '+userName);
		};

	return false;
}

const requestListener = function (req, res) {
	if (req.method == 'GET' && (req.url == '/' || req.url == '/create'))
	{
		fs.readFile(__dirname + "/CreateUsername.html")
			.then(contents => {
				// server response
				res.setHeader("Content-Type", "text/html");
				// response.writeHead(statusCode[, statusMessage][, headers]);
				res.writeHead(200);
				res.end(contents);
			})
	}
	else if (req.method == 'GET' && req.url == '/login')
	{
		fs.readFile(__dirname + "/Login.html")
			.then(contents => {
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(contents);
			})
	}
	else if (req.method == 'GET' && req.url == '/game')
	{
		fs.readFile(__dirname + "/index.html")
			.then(contents => {
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(contents);
			})
	}

	// post: create a new user
	else if (req.method === 'POST' && req.url.startsWith('/create') )
	{
		// var body = '';
		// req.on("data", function(data) {
    //         body += data.toString();
    //     });


		var data1 = req.url.split('?')[1];
		var username = data1.split(':')[0];
		var password = data1.split(':')[1];
		//var data3 = data1.replace('%22', '"');
		// var obj = JSON.parse(data2);
		// console.log(obj.userName);

		var success = CreateUsername(username, password);

		console.log(username+password);
		res.writeHead(200, {"Context-Type" : "text/html"});
		// res.write("This is a message from the server!");
		if (success) {
			res.write('Success!');
		} else {
			res.write('Identical usernames!');
		}
		res.end();
	}
	// else
	// {
	// 	send404Response(response);
	// }

	// check password
	else if (req.method === 'POST' && req.url.startsWith('/login') )
	{
		// var body = '';
		// req.on("data", function(data) {
    //         body += data.toString();
    //     });


		var data1 = req.url.split('?')[1];
		var username = data1.split(':')[0];
		var password = data1.split(':')[1];

		var exist = CkUsername(username, password);

		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		if (exist == true ) {
			res.write('Success!')
		} else {
			res.write('Oops, wrong credentials!')
		}
		res.end();

	}
};

const server = http.createServer(requestListener);
server.listen(8000);
