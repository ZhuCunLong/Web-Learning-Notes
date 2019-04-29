const fs = require('fs')

const dpPath = './db.json'

exports.find = function (callback) {
	fs.readFile(dpPath, 'utf-8', function (err, data) {
		if(err){
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}
