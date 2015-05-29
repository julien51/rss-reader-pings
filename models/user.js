var Reader = require(__dirname + '/reader.js');

var redis;

function User(params) {
	this.id = params.id;
	this.name = params.name;
	this.url = params.url;
}

User.batch = function(cb, done) {
	// Evil:
	redis.keys('user:*', function(error, keys) {

		function yieldNextUser(keys) {
			k = keys.pop();

			if(!k)
				return done(); 

			redis.hgetall(k, function(error, fields) {
				var u = new User({
					id: k,
					name: fields.name,
					url: fields.url
				});
				u.reader = new Reader({
					app: fields['reader:app'],
					credentials: {
						login: fields['reader:login'],
						password: fields['reader:password'],
					}
				});
				return cb(u, function() {
					yieldNextUser(keys);
				});
			});
		}

		yieldNextUser(keys);

	});
}

module.exports = function(_redis) {
	redis = _redis;
	return User;
};

