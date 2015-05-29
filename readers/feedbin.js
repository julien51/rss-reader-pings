var request = require('request');

function Feedbin(credentials) {
	this.credentials = credentials;
}


Feedbin.prototype.prepRequest = function prepRequest(path, params) {
	return {
		url: ['https://api.feedbin.com/v2', path].join('/'),
		json: true,
		auth: {
			user: this.credentials.login,
			pass: this.credentials.password
		}
	}
}

// Includes pagination
Feedbin.prototype.getEntriesFromIds = function (ids, entries, cb) {
	var that = this;

	if(typeof(entries) == 'function') {
		cb = entries;
		entries = [];		
	}

	if(ids.length == 0)
		return cb(null, entries);

	var x = ids.splice(100);

	request.get(this.prepRequest(['entries.json?ids', ids.join(',')].join('=')), function(error, content, body) {
		entries = entries.concat(body);
		return that.getEntriesFromIds(x, entries, cb);
	});
}


Feedbin.prototype.getIdsFor = function(doc, cb) {
	var that = this;
	request.get(this.prepRequest(doc), function(error, content, body) {
		if(error)
			return cb(error);
		that.getEntriesFromIds(body.reverse(), cb); // Put newest first.
	});
}

Feedbin.prototype.starred = function(cb) {
	this.getIdsFor('starred_entries.json', cb);
}

Feedbin.prototype.read = function(cb) {
	this.getIdsFor('recently_read_entries.json', cb);
}

module.exports = Feedbin;

