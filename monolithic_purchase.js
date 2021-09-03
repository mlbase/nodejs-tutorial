const mysql = require('mysql');
const conn = {
	host: 'localhost',
	user: 'micro',
	password: 'service',
	database: 'monolithic'
};

exports.onRequest = function( res, method, pathname, params, cb){

	switch(method){
		case "POST":
			return register(res, method, pathname, params, (response) => {
					process.nextTick(cb, res, response); });
		case "GET":
			return register(res, method, pathname, params, (response) => {
					process.nextTick(cb, res, response); });
		default:
			return process.nextTick(cb, res, null);
	}
}



function register(method, pathname, params, cb) {
	var response = {
		key: params.key,
		errorcode: 0,
		errormessage: "success"
	}

	if(params.userid == null && params.goodsid == null) {
		response.errorcode =1;
		response.errormessage = "Invalid Parameter";
		cb(response);
	} else {
		var connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("insert into purchase(userid, goodsid) values(?,?)"
			, [params.userid, params.goodsid]
			, (error, results, fields) => {
				if(error) {
					response.error = 1;
					response.errormessage = error;
				}
				cb(response);
			});
			connection.end();
	}
}


function inquiry(method, pathname, params, cb) {
	var response = {
		key: params.key,
		errorcode: 0,
		errormessage: "success"
	};

	if(params.userid == null)	{
		response.errorcode = 1;
		response.errormessage = "Invalid Parameter";
		cb(response);
	} else {
		var connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("select id, goodsid, date form purchase where userid = ?" 
						, [params.userid]
						, (error, results, fields) => {
			if(error) {
				response.errorcode = 1;
				response.errormessage = error;
			} else {
				response.results = results;
			}
			cb(response); 
		});
		connection.end();
	}

}