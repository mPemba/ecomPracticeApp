

////update/create user

var user = require('./../models/user');
var q = require('q');

module.exports = {
	updateOrCreate = function(user) {
		var dfd = q.defer();
		user.findOne({ googleID: user.id}, function(results) {
			if (results) {
				user.update({ _id: results._id}, {
					name: user.displayName,
					googleID: user.id,
					plusLink: user.json.link,
					picture: user.json.picture,
					gender: user.json.gender
				}, function(err, results) {
					if (err) {
						dfd.reject(err);
					} else {
						dfd.resolve(results);
					}
				})
			} else {
				user.create({ _id: results._id}, {
					name: user.displayName,
					googleID: user.id,
					plusLink: user.json.link,
					picture: user.json.picture,
					gender: user.json.gender
				}, function(err, results) {
					if (err) {
						dfd.reject(err);
					} else {
						dfd.resolve(results);
					}
			}
		})
		return dfd.promise;
	}
}