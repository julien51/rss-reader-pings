function Reader(params, credentials) {
	var App = require(__dirname + '/../readers/' + params.app + '.js')
	this.app = new App(params.credentials);
}

Reader.prototype.sync = function sync(cb) {
	var that = this;

	that.app.starred(function(error, starred) {

		items = starred.map(function(s) {
			return {
				starred: s.url,
			}
		});

		if(error)
			return cb(error);

		that.app.read(function(error, read) {
			if(error)
				return cb(error)

			items = items.concat(read.map(function(s) {
				return {
					read: s.url,
				}
			}));

			return cb(null, items);
		});
	});
}

module.exports = Reader;